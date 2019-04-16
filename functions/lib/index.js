"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const auth_functions_1 = require("./auth.functions");
const artisan_functions_1 = require("./artisan.functions");
const payouts_functions_1 = require("./payouts.functions");
// This file needs to be retrieved from
// https://console.firebase.google.com/u/0/project/handmade-error-404/settings/serviceaccounts/adminsdk
// it should NOT be uploaded to github!!!!!!!!!!!!
const serviceAccount = require("../assets/service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${serviceAccount.project_id}.firebaseio.com`,
    storageBucket: `gs://${serviceAccount.project_id}.appspot.com`
});
exports.loginWithAmazon = functions.https.onCall(auth_functions_1.loginWithAmazon);
exports.addArtisan = functions.https.onCall(artisan_functions_1.addArtisan);
exports.deleteArtisan = functions.https.onCall(artisan_functions_1.deleteArtisan);
exports.logPayout = functions.https.onCall(payouts_functions_1.logPayout);
//# sourceMappingURL=index.js.map