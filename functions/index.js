const functions = require('firebase-functions')
const admin = require('firebase-admin')
const twilio = require("twilio")
var fs = require("fs")

// the file for twlio account info.
// ask patrick for it if you need it.
// it should NOT be uploaded to github!!!!!!!!!!!!
const twilioInfo = JSON.parse(fs.readFileSync("twilio.json"))
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken)

// This file needs to be retrieved from
// https://console.firebase.google.com/u/0/project/handmade-error-404/settings/serviceaccounts/adminsdk
// it should NOT be uploaded to github!!!!!!!!!!!!
const serviceAccount = require("./service-account.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://handmade-error-404.firebaseio.com"
});

exports.loginWithAmazon = functions.https.onCall((data, context) => {
  console.log(data)
  const email = data.userInfo.email
  const name = data.userInfo.name
  const amazonId = data.userInfo.user_id
  const accessToken = data.accessToken

  const uid = (`amazon:${amazonId}`).replace(/\./g, "-")

  const databaseTask = admin.database().ref(`/amazonUsers/${uid}`).set({
    name: name,
    email: email,
    amazonId: amazonId,
    accessToken: accessToken,
    uid: uid
  })

  const userCreationTask = admin.auth().updateUser(uid, {
    displayName: name,
    email: email,
    emailVerified: true
  }).catch((error) => {
    if(error.code === 'auth/user-not-found') {
      return admin.auth().createUser({
        uid: uid,
        displayName: name,
        email: email,
        emailVerified: true
      })
    }

    throw error
  })

  return Promise.all([userCreationTask, databaseTask]).then(() => {
    return admin.auth().createCustomToken(uid)
  }).then((token) => {
    console.log(`Created custom token for UID "${uid}", Token: ${token}`)
    return {
      token: token
    }
  })
})

exports.sendMessage = functions.https.onCall((data, context) => {
  console.log(data)
  const sender = data.sender
  const recipients = Object.keys(data.recipients)
  const phoneNumbers = Object.values(data.recipients)
  const message = data.message

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

  return Promise.all(promises)
})

function sendText(number, msg) {
  return client.messages.create({
    body: msg,
    from: '+15304884220',
    to: "+" + number
  }).then(message => console.log(message.sid))
}

exports.recievedMessage = functions.https.onRequest((req, res) => {
  var text = req.body.Body;
  const twiml = new MessagingResponse();
  //handleMessage(text, req.body.From, res, twiml);
});