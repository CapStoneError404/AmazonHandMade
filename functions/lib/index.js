"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const auth_functions_1 = require("./auth.functions");
const artisan_functions_1 = require("./artisan.functions");
const messaging_functions_1 = require("./messaging.functions");
// This file needs to be retrieved from
// https://console.firebase.google.com/u/0/project/handmade-error-404/settings/serviceaccounts/adminsdk
// it should NOT be uploaded to github!!!!!!!!!!!!
const serviceAccount = require("../assets/service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://handmade-error-404.firebaseio.com",
    storageBucket: "gs://handmade-error-404.appspot.com"
});
exports.loginWithAmazon = functions.https.onCall(auth_functions_1.loginWithAmazon);
exports.addArtisan = functions.https.onCall(artisan_functions_1.addArtisan);
exports.deleteArtisan = functions.https.onCall(artisan_functions_1.deleteArtisan);
exports.sendMessage = functions.https.onCall(messaging_functions_1.sendMessage);
exports.receiveMessage = functions.https.onRequest(messaging_functions_1.receiveMessage);
//# sourceMappingURL=index.js.map