const admin = require('firebase-admin')

exports.addArtisan = async (data, context) => {
  let artisanInfo = data.artisanInfo
  let cgaID = data.cgaID

  // Add artisan to artisans root
  let newArtisan = admin.database().ref('artisans/').push(artisanInfo)

  // Add phone to artisan ID to phoneMap root
  let newPhone = admin.database()
    .ref(`phoneMap/${data.phoneNumber}`)
    .set(newArtisan.key)

  await Promise.all([newArtisan, newPhone])

  var artisanObject = {
    name: data.name,
    phoneNumber: data.phoneNumber,
    description: data.description,
    uid: newArtisan.key
  }

  // Add artisanID to cga in amazonUsers root
  let updateCGATask = admin.database()
    .ref(`amazonUsers/${cgaID}/artisans/${newArtisan.key}`)
    .set(true)

  // Upload profile picture to storage and add url to artisan
  if(data.profilePicturePath) {
    console.log("Pushing photo to storage")
    var st_ref = await admin.storage()
      .ref(`artisanFiles/${newArtisan.key}/images/profilePicture`)
      .putFile(data.profilePicturePath)

    artisanObject.profilePictureURL = st_ref.downloadURL
    
    admin.database().ref(`artisans/${artisanObject.uid}`).update(
      { profilePictureURL: st_ref.downloadURL })
  }

  return artisanObject
}

exports.deleteArtisan = (data, context) => {
  let artisanID = data.id
  let artisanRootTask = admin.database().ref(`artisans/${artisanID}`).remove()
  let storageTask = admin.storage().ref(`artisanFiles/${artisanID}`).delete()
  return Promise.all([artisanRootTask, storageTask])
}