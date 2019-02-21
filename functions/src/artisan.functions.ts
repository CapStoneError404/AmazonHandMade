import * as admin from 'firebase-admin'

export async function addArtisan(data) {
  console.log("Adding artisan with the following data:")
  console.log(data)

  let artisanInfo = data.artisanInfo
  let cgaID = data.cgaID

  let artisanDBInfo = {
    cgaID: cgaID,
    ...artisanInfo
  }

  // Add artisan to artisans root
  let newArtisan = admin.database().ref('artisans/').push(artisanDBInfo)

  // Add phone to artisan ID to phoneMap root
  await admin.database()
    .ref(`phoneMap/${artisanInfo.phoneNumber}`)
    .set(newArtisan.key)

  var artisanObject = {
    name: artisanInfo.name,
    phoneNumber: artisanInfo.phoneNumber,
    description: artisanInfo.description,
    uid: newArtisan.key
  }

  // Add artisanID to cga in amazonUsers root
  admin.database().ref(`amazonUsers/${cgaID}/artisans/${newArtisan.key}`).set(true)

  console.log("Returning:")
  console.log(artisanObject)

  return artisanObject
}

export async function deleteArtisan(data) {
  console.log("Deleting artisan with the following data:")
  console.log(data)

  let artisanID = data.uid
  let artisanInfo = (await admin.database().ref(`artisans/${artisanID}`).once('value')).val()
  
  let artisanRootTask = admin.database().ref(`artisans/${artisanID}`).remove()
  let phoneTask = admin.database().ref(`phoneMap/${artisanInfo.phoneNumber}`).remove()
  let cgaTask = admin.database().ref(`amazonUsers/${artisanInfo.cgaID}/artisans/${artisanID}`).remove()

  return Promise.all([artisanRootTask, phoneTask, cgaTask])
}