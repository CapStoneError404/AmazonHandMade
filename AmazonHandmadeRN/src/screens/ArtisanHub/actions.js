import firebase from 'react-native-firebase'

export function createArtisan(data) {
  return async (dispatch, prevState) => { 
    var uid = ""
    var profilePictureURL = ""
    return firebase.database().ref('artisans/').push({
      name: data.name,
      phoneNumber: data.phoneNumber,
      description: data.description
    }).then((ref) => {
      uid = ref.key
      if (data.profilePicturePath) {
        return firebase.storage()
          .ref(`artisanFiles/${ref.key}/images/profilePicture`)
          .putFile(data.profilePicturePath)
          .then((ref) => {
            profilePictureURL = ref.downloadURL
            return firebase.database().ref(`artisans/${uid}`).update({
              profilePictureURL: ref.downloadURL
          })
        })
      } else {
        return new Promise((resolve, reject) => {
          resolve()
        })
      }
    }).then(() => {
      return dispatch({type: 'ADD_ARTISAN', artisanId: uid, artisan: {
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: data.description,
        profilePictureURL: profilePictureURL,
        uid: uid
      }})
    })
  }
}

export function fetchArtisans() {
  return async (dispatch, prevState) => {
    return firebase.database().ref('artisans').once('value').then((snapshot) => {
      artisanArray = []
      artisanObject = snapshot.val()
      for(var uid in artisanObject) {
        artisanArray.push({
          ...artisanObject[uid],
          uid: uid
        })
      }
      
      dispatch({type: 'GET_ARTISANS', artisans: artisanArray})
    })
  }
}