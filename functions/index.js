import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'

import { loginWithAmazon } from './auth.functions.js'
import { addArtisan } from './artisan.functions.js'
import { sendMessage } from './messaging.functions.js'

// This file needs to be retrieved from
// https://console.firebase.google.com/u/0/project/handmade-error-404/settings/serviceaccounts/adminsdk
// it should NOT be uploaded to github!!!!!!!!!!!!
const serviceAccount = require("./service-account.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://handmade-error-404.firebaseio.com"
});

module.exports = {
  'loginWithAmazon': functions.https.onCall(loginWithAmazon),
  'addArtisan': functions.https.onCall(addArtisan),
  'sendMessage': functions.https.onCall(sendMessage)
}