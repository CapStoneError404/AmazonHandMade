const admin = require('firebase-admin')
const twilio = require("twilio")

// the file for twlio account info.
// ask patrick for it if you need it.
// it should NOT be uploaded to github!!!!!!!!!!!!
const twilioInfo = require('./twilio.json')
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken)
const MessagingResponse = twilio.twiml.MessagingResponse

exports.sendMessage = (data, context) => {
  console.log(data)
  const sender = data.body.sender
  const recipients = Object.keys(data.body.recipients)
  const phoneNumbers = Object.keys(data.body.recipients).map(key => data.body.recipients[key])
  const message = data.body.message

  // Generate conversation
  let participants = [sender]
  for(r in recipients) {
    participants.push(recipients[r])
  }
  participants.sort()
  const conversationID = participants.join('_')

  var promises = []

  const conversationRef = admin.database().ref(`/conversations/${conversationID}`)
  const conversationTask = conversationRef.once('value').then(snapshot => {
    var conversationPromises = []
    
    if(!snapshot.exists()) {
      const createConversation =  conversationRef.set({
        participants: participants.reduce(
          (map, participant) => Object.assign(map, {[participant]: true}), 
          {}
        )
      })

      conversationPromises.push(createConversation)

      for(p in participants) {
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

  promises.push(conversationTask)
  for(i in phoneNumbers) {
    promises.push(sendText(phoneNumbers[i], message.contents))
  }

  return Promise.all(promises).then(() => {
    return conversationRef.once('value')
  }).then(snapshot => {
    return snapshot.val()
  })
}

function sendText(number, msg) {
  return client.messages.create({
    body: msg,
    from: '+15304884220',
    to: "+" + number
  }).then(message => console.log(message.sid))
}

exports.recievedMessage = (req, res) => {
  var text = req.body.Body;
  const twiml = new MessagingResponse();
  //handleMessage(text, req.body.From, res, twiml);
}