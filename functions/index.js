const functions = require('firebase-functions');
const admin = require('firebase-admin')

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