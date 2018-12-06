import firebase from 'react-native-firebase'

export function createArtisan(data) {
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      var db_ref = await firebase.database().ref('artisans/').push({
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: data.description
      })

      artisanObject = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: data.description,
        uid: db_ref.key
      }

      if(data.profilePicturePath) {
        var st_ref = await firebase.storage()
          .ref(`artisanFiles/${db_ref.key}/images/profilePicture`)
          .putFile(data.profilePicturePath)

        artisanObject.profilePictureURL = st_ref.downloadURL
        
        firebase.database().ref(`artisans/${artisanObject.uid}`).update(
          { profilePictureURL: st_ref.downloadURL })
      }

      resolve()
      dispatch({type: 'ADD_ARTISAN', artisan: artisanObject})
    })
  }
}

export function fetchArtisans() {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      snapshot = await firebase.database().ref('artisans').once('value')
      artisanArray = []
      artisanObject = snapshot.val()
      
      for(var uid in artisanObject) {
        artisanArray.push({
          ...artisanObject[uid],
          uid: uid
        })
      }
      
      resolve()
      dispatch({type: 'GET_ARTISANS', artisans: artisanArray})
    })
  }
}