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
function addArtisan(data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Adding artisan with the following data:");
        console.log(data);
        let artisanInfo = data.artisanInfo;
        let cgaID = data.cgaID;
        let artisanDBInfo = Object.assign({ cgaID: cgaID }, artisanInfo);
        // Add artisan to artisans root
        let newArtisan = admin.database().ref('artisans/').push(artisanDBInfo);
        // Add phone to artisan ID to phoneMap root
        let newPhone = yield admin.database()
            .ref(`phoneMap/${artisanInfo.phoneNumber}`)
            .set(newArtisan.key);
        var artisanObject = {
            name: artisanInfo.name,
            phoneNumber: artisanInfo.phoneNumber,
            description: artisanInfo.description,
            uid: newArtisan.key
        };
        // Add artisanID to cga in amazonUsers root
        let updateCGATask = admin.database()
            .ref(`amazonUsers/${cgaID}/artisans/${newArtisan.key}`)
            .set(true);
        console.log("Returning:");
        console.log(artisanObject);
        return artisanObject;
    });
}
exports.addArtisan = addArtisan;
function deleteArtisan(data, context) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Deleting artisan with the following data:");
        console.log(data);
        let artisanID = data.uid;
        let artisanInfo = (yield admin.database().ref(`artisans/${artisanID}`).once('value')).val();
        let artisanRootTask = admin.database().ref(`artisans/${artisanID}`).remove();
        let phoneTask = admin.database().ref(`phoneMap/${artisanInfo.phoneNumber}`).remove();
        let cgaTask = admin.database().ref(`amazonUsers/${artisanInfo.cgaID}/artisans/${artisanID}`).remove();
        return Promise.all([artisanRootTask, phoneTask, cgaTask]);
    });
}
exports.deleteArtisan = deleteArtisan;
//# sourceMappingURL=artisan.functions.js.map