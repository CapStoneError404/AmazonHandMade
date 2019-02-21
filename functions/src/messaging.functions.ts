import * as admin from 'firebase-admin'
import * as twilio from 'twilio'

// the file for twlio account info.
// ask patrick for it if you need it.
// it should NOT be uploaded to github!!!!!!!!!!!!
const twilioInfo = require('../assets/twilio.json')
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken)

// data: {
//   sender: UID of sender,
//   recipients: {
//     UID: phoneNumber,
//     UID: phoneNumber,
//     ...
//   },
//   message: {
//     timeCreated: Date(),
//     contents: String
//   }
// }
export async function sendMessage(data) {
  console.log("Sending text wth the following data:")
  console.log(data)

  const sender = data.sender
  const recipients = Object.keys(data.recipients)
  const phoneNumbers = Object.keys(data.recipients).map(key => data.recipients[key])
  const message = data.message

  for(var i in phoneNumbers) {
    await sendText(phoneNumbers[i], message.contents)
  }

  let conversationID = await updateDatabaseWithMessage(message, sender, recipients)
  let conversationSnapshot = await admin.database().ref(`/conversations/${conversationID}`).once('value')
  return {
    uid: conversationID,
    ...conversationSnapshot.val()
  }
}

export async function receiveMessage(req) {
  console.log("Receiving text with the following request data:")
  console.log(req.body)

  let text = req.body.Body
  let sender = req.body.From

  // Look up sender
  let phoneSnapshot = await admin.database().ref(`phoneMap/${sender}`).once('value')
  let artisanId = phoneSnapshot.val()

  // Get sender's cga (AKA the recipient)
  let cgaSnapshot = await admin.database().ref(`artisans/${artisanId}/cgaID`).once('value')
  let cgaId = cgaSnapshot.val()

  // Update the database
  let message = {
    contents: text,
    timeCreated: (new Date()).valueOf()
  }
  return updateDatabaseWithMessage(message, artisanId, [cgaId])
}

function sendText(number, msg) {
  console.log(`Sending text to ${number} with message: ${msg}`)
  return client.messages.create({
    body: msg,
    from: twilioInfo.phoneNumber,
    to: number
  }).then(message => console.log(message.sid))
}

// message: {
//   contents: String,
//   timeCreated: Date()
// }
// sender: UID of Sender
// recipients: [UIDs of Recipients]
// returns conversationId
async function updateDatabaseWithMessage(message, sender, recipients) {

  // Generate conversation
  let participants = [sender]
  for(var r in recipients) {
    participants.push(recipients[r])
  }
  participants.sort()
  const conversationID = participants.join('_')

  const conversationRef = admin.database().ref(`/conversations/${conversationID}`)
  await conversationRef.once('value').then(snapshot => {
    var conversationPromises = []
    
    if(!snapshot.exists()) {
      const createConversation =  conversationRef.set({
        participants: participants.reduce(
          (map, participant) => Object.assign(map, {[participant]: true}), 
          {}
        )
      })

      conversationPromises.push(createConversation)

      for(var p in participants) {
        const id = participants[p]
        const refRoot = (participants[p].includes("amazon")) ? 'amazonUsers' : 'artisans'
        
        const updateConversations = admin.database()
          .ref(`${refRoot}/${id}`)
          .child("conversations")
          .child(conversationID)
          .set(true)

        conversationPromises.push(updateConversations)
      }
    }

    const addMessage = conversationRef.child("messages").push({
      contents: message.contents,
      timeCreated: message.timeCreated,
      author: sender
    })
    conversationPromises.push(addMessage)

    return Promise.all(conversationPromises)
  })

  return conversationID
}