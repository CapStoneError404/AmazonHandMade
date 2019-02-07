const functions = require('firebase-functions');
const admin = require('firebase-admin');
const twilio = require("twilio");
var fs = require("fs");

// the file for twlio account info.
// ask patrick for it if you need it.
// it should NOT be uploaded to github!!!!!!!!!!!!
const twilioInfo = JSON.parse(fs.readFileSync("twilio.json"));
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken);
// This file needs to be retrieved from
// https://console.firebase.google.com/u/0/project/handmade-error-404/settings/serviceaccounts/adminsdk
// it should NOT be uploaded to github!!!!!!!!!!!!
const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://handmade-error-404.firebaseio.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((req, res) => {
  response.send("Hello from Firebase!");
});

exports.loginWithAmazon = functions.https.onRequest((req, res) => {
  console.log(req.body)
  const email = req.body.userInfo.email
  const name = req.body.userInfo.name
  const amazonId = req.body.userInfo.user_id
  const accessToken = req.body.accessToken

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
    return res.json({
      token: token
    })
  })
})
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
exports.sendMessage = functions.https.onRequest((req, res) => {
  var db = admin.database()
  var phone_numbers = []
  req.body.recipients.sort();
  var cnvId = req.body.recipients.join("")
  var cnvRef = db.ref("conversations").child(cnvId)
  var msg = {author: req.body.sender, content:req.body.message, timeCreated:req.body.timeCreated}
  console.log(req.body.recipients)
  var participants = {}
  for(var i = 0; i < req.body.recipients.length; i++){
      participants[req.body.recipients[i]] = true
  }
  console.log(participants)
  if(cnvRef.key !== null){
    console.log("here")
    cnvRef.child("messages").push(msg);
  }else{
    cnvRef.push({
      messages:[
        msg
      ],
      participants: participants
    });
    cnvRef.child("participants").push(participants)
    db.ref("amazonUsers").child(req.body.sender).child("conversations").child(cnvId).push(true)
  }
  for(var i = 0; i < req.body.recipients.length; i++){
      phone_numbers.push(db.ref("artisans").child(req.body.recipients[i]).child("phoneNumber").toJSON().replace(/\D/g,''));
  }
  
  var x = 0
  for(var i = 0; i < phone_numbers.length; i++){
    sendText(phone_numbers[i], req.body.message).then(function(){
      x++
      if(x === phone_numbers.length){
          res.status(200).send({cnv:cnvId, msg:{msg}});
      }
    });
  }
});

sendText = function(number, msg){
  return client.messages
  .create({
     body: msg,
     from: '+15304884220',
     to: "+"+number
   })
  .then(message => console.log(message.sid))
}