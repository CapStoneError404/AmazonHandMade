"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
function loginWithAmazon(data, context) {
    console.log("Logging in with Amazon with the following data:");
    console.log(data);
    const email = data.userInfo.email;
    const name = data.userInfo.name;
    const amazonId = data.userInfo.user_id;
    const accessToken = data.accessToken;
    // Firebase ids cant have dots in them, replaceing with -
    const uid = (`amazon:${amazonId}`).replace(/\./g, "-");
    // Add cga tp amazonUsers root
    const databaseTask = admin.database().ref(`/amazonUsers/${uid}`).update({
        name: name,
        email: email,
        amazonId: amazonId,
        accessToken: accessToken
    });
    // Create an actual auth user or update an existing one
    const userCreationTask = admin.auth().updateUser(uid, {
        displayName: name,
        email: email,
        emailVerified: true
    }).catch((error) => {
        if (error.code === 'auth/user-not-found') {
            return admin.auth().createUser({
                uid: uid,
                displayName: name,
                email: email,
                emailVerified: true
            });
        }
        throw error;
    });
    return Promise.all([userCreationTask, databaseTask]).then(() => {
        return admin.auth().createCustomToken(uid);
    }).then((token) => {
        console.log(`Returning custom token for UID "${uid}", Token: ${token}`);
        return {
            token: token,
            cgaID: uid
        };
    });
}
exports.loginWithAmazon = loginWithAmazon;
//# sourceMappingURL=auth.functions.js.map