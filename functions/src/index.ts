import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { loginWithAmazon } from './auth.functions'
import { addArtisan, deleteArtisan } from './artisan.functions'
import { sendMessage, receiveMessage } from './messaging.functions'

// This file needs to be retrieved from
// https://console.firebase.google.com/u/0/project/handmade-error-404/settings/serviceaccounts/adminsdk
// it should NOT be uploaded to github!!!!!!!!!!!!
const serviceAccount = require("../assets/service-account.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://handmade-error-404.firebaseio.com",
  storageBucket: "gs://handmade-error-404.appspot.com"
})

exports.loginWithAmazon = functions.https.onCall(loginWithAmazon)
exports.addArtisan = functions.https.onCall(addArtisan)
exports.deleteArtisan = functions.https.onCall(deleteArtisan)
exports.sendMessage = functions.https.onCall(sendMessage)
exports.receiveMessage = functions.https.onRequest(receiveMessage)