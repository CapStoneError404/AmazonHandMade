const functions = require('firebase-functions')
const admin = require('firebase-admin')
const twilio = require("twilio")
var fs = require("fs")

// the file for twlio account info.
// ask patrick for it if you need it.
// it should NOT be uploaded to github!!!!!!!!!!!!
<<<<<<< HEAD
const twilioInfo = JSON.parse(fs.readFileSync("twilio.json"))
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken)

=======
const twilioInfo = JSON.parse(fs.readFileSync("twilio.json"));
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken);
const MessagingResponse = twilio.twiml.MessagingResponse;
>>>>>>> a7565e5531bc7694925fd165130571d72173edf4
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
<<<<<<< HEAD

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
=======
// exports.sendMessage = functions.https.onCall((data, context) => {
//   phone_numbers = data.phone_numbers
//   let sns_sevrvice = new AWS.SNS({apiVersion: '2010-03-31'});
//   if (!context.auth) {
//     // Throwing an HttpsError so that the client gets the error details.
//     throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
//         'while authenticated.');
//   }
//   for(var i = 0; i < phone_numbers.length; i++){
//     var message = {Message:data.text, PhoneNumber:phone_numbers[i]}
//     var message_promise = sns_sevrvice.publish(params).promise();
//     message_promise.then(
//       function(data) {
//         console.log("MessageID is " + data.MessageId);
//       }).catch(
//         function(err) {
//         console.error(err, err.stack);
//       });
//   }

// });
//https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/sns-examples-sending-sms.html
exports.recievedMessage = functions.https.onRequest((req, res) => {
  var text = req.body.Body;
  const twiml = new MessagingResponse();
  handleMessage(text, req.body.From, res, twiml);

});
respondToText = function(res, text, twiml){
  twiml.message(text);

  res.writeHead(200, {'Content-Type': 'text/xml'});
  res.end(twiml.toString());
}

exports.sendMessage = functions.https.onRequest((req, res) => {
  var db = admin.database()
  var phone_numbers = []
  req.body.recipients.sort();
  var cnvId = req.body.recipients.join("")
  var cnvRef = db.ref("conversations").child(cnvId)
  var msg = {author: req.body.sender, content:req.body.message, timeCreated:req.body.timeCreated}
  console.log(req.body.recipients)
  var participants = {}
  var i = 0
  for(i = 0; i < req.body.recipients.length; i++){
      participants[req.body.recipients[i]] = true
  }
  console.log(participants)
  if(cnvRef.toJSON() === {} ){
    cnvRef.child("messages").push(msg);
  }else{
    cnvRef.push({
      messages:[
        msg
      ],
      participants:req.body.recipients
    });
    db.ref("amazonUsers").child(req.body.sender).child("conversations").child(cnvId).push(true)
  }
  for(i = 0; i < req.body.recipients.length; i++){
      phone_numbers.push(db.ref("artisans").child(req.body.recipients[i]).child("phoneNumber").toJSON().replace(/\D/g,''));
  }
  ////works
  var x = 0
  for(i = 0; i < phone_numbers.length; i++){
    sendText(phone_numbers[i], req.body);
>>>>>>> a7565e5531bc7694925fd165130571d72173edf4
  }

<<<<<<< HEAD
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
=======
sendText = function(number, msg){
  client.messages
  .create({
     body: msg,
     from: '+15304884220',
     to: "+"+number
   })
}
>>>>>>> a7565e5531bc7694925fd165130571d72173edf4
