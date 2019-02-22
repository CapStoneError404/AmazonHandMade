"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const twilio = require("twilio");
// the file for twlio account info.
// ask patrick for it if you need it.
// it should NOT be uploaded to github!!!!!!!!!!!!
const twilioInfo = require('../assets/twilio.json');
const client = twilio(twilioInfo.accountSid, twilioInfo.authToken);
const MessagingResponse = twilio.twiml.MessagingResponse;
// data: {
//   sender: UID of sender,
//   recipients: {
//     UID: phoneNumber,
//     UID: phoneNumber,
//     ...
//   },
//   message: {
//     timeCreated: Date(),
//     contents: String
//   }
// }
function sendMessage(data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Sending text wth the following data:");
        console.log(data);
        const sender = data.sender;
        const recipients = Object.keys(data.recipients);
        const phoneNumbers = Object.keys(data.recipients).map(key => data.recipients[key]);
        const message = data.message;
        for (var i in phoneNumbers) {
            yield sendText(phoneNumbers[i], message.contents);
        }
        let conversationID = yield updateDatabaseWithMessage(message, sender, recipients);
        let conversationSnapshot = yield admin.database().ref(`/conversations/${conversationID}`).once('value');
        return Object.assign({ uid: conversationID }, conversationSnapshot.val());
    });
}
exports.sendMessage = sendMessage;
function receiveMessage(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Receiving text with the following request data:");
        console.log(req.body);
        let text = req.body.Body;
        let sender = req.body.From;
        // Look up sender
        let phoneSnapshot = yield admin.database().ref(`phoneMap/${sender}`).once('value');
        let artisanId = phoneSnapshot.val();
        // Get sender's cga (AKA the recipient)
        let cgaSnapshot = yield admin.database().ref(`artisans/${artisanId}/cgaID`).once('value');
        let cgaId = cgaSnapshot.val();
        // Update the database
        let message = {
            contents: text,
            timeCreated: (new Date()).valueOf()
        };
        return updateDatabaseWithMessage(message, artisanId, [cgaId]);
    });
}
exports.receiveMessage = receiveMessage;
function sendText(number, msg) {
    console.log(`Sending text to ${number} with message: ${msg}`);
    return client.messages.create({
        body: msg,
        from: twilioInfo.phoneNumber,
        to: number
    }).then(message => console.log(message.sid));
}
// message: {
//   contents: String,
//   timeCreated: Date()
// }
// sender: UID of Sender
// recipients: [UIDs of Recipients]
// returns conversationId
function updateDatabaseWithMessage(message, sender, recipients) {
    return __awaiter(this, void 0, void 0, function* () {
        // Generate conversation
        let participants = [sender];
        for (var r in recipients) {
            participants.push(recipients[r]);
        }
        participants.sort();
        const conversationID = participants.join('_');
        const conversationRef = admin.database().ref(`/conversations/${conversationID}`);
        yield conversationRef.once('value').then(snapshot => {
            var conversationPromises = [];
            if (!snapshot.exists()) {
                const createConversation = conversationRef.set({
                    participants: participants.reduce((map, participant) => Object.assign(map, { [participant]: true }), {})
                });
                conversationPromises.push(createConversation);
                for (var p in participants) {
                    const id = participants[p];
                    const refRoot = (participants[p].includes("amazon")) ? 'amazonUsers' : 'artisans';
                    const updateConversations = admin.database()
                        .ref(`${refRoot}/${id}`)
                        .child("conversations")
                        .child(conversationID)
                        .set(true);
                    conversationPromises.push(updateConversations);
                }
            }
            const addMessage = conversationRef.child("messages").push({
                contents: message.contents,
                timeCreated: message.timeCreated,
                author: sender
            });
            conversationPromises.push(addMessage);
            return Promise.all(conversationPromises);
        });
        return conversationID;
    });
}
//# sourceMappingURL=messaging.functions.js.map