import firebase from 'react-native-firebase'

export function createArtisan(data) {
  return async (dispatch, prevState) => { 
    var uid = ""
    var profilePicURL = ""
    return firebase.database().ref('artisans/').push({
      name: data.name,
      phoneNumber: data.phoneNumber,
      description: data.description
    }).then((ref) => {
      uid = ref.key
      return firebase.storage()
        .ref(`artisanFiles/${ref.key}/images/profilePicture`)
        .putFile(data.profilePicturePath)
    }).then((ref) => {
      profilePicURL = ref.downloadURL
      return firebase.database().ref(`artisans/${uid}`).update({
        profilePictureURL: ref.downloadURL
      })
    }).then(() => {
      dispatch({type: 'ADD_ARTISAN', artisan: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: data.description,
        imageURL: profilePicURL
      }})
    })
  }
}