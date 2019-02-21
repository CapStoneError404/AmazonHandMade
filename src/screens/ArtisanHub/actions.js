import firebase from 'react-native-firebase'

export function createArtisan(data) {
  return (dispatch) => { 
    return new Promise(async (resolve) => {
      console.log("Pushing artisan to db")
      var db_ref = await firebase.database().ref('artisans/').push({
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: data.description
      })
      console.log("Done")

      artisanObject = {
        name: data.name,
        phoneNumber: data.phoneNumber,
        description: data.description,
        uid: db_ref.key
      }

      if(data.profilePicturePath) {
        console.log("Pushing photo to storage")
        var st_ref = await firebase.storage()
          .ref(`artisanFiles/${db_ref.key}/images/profilePicture`)
          .putFile(data.profilePicturePath)
        console.log("Done")

        artisanObject.profilePictureURL = st_ref.downloadURL
        
        console.log("Fetching photo download url")
        firebase.database().ref(`artisans/${artisanObject.uid}`).update(
          { profilePictureURL: st_ref.downloadURL })
      }

      resolve()
      dispatch({type: 'ADD_ARTISAN', artisan: artisanObject})
    })
  }
}

export function fetchArtisans() {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      console.log("Fetching artisans")
      snapshot = await firebase.database().ref('artisans').once('value')
      console.log("Done")
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

// action takes in current list of artisans and artisan to be deleted
// sends that artisan to reducer to be filtered out of state
// Also check that artisan has an image if so delete that from storage
export function deleteArtisan(artisan) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      await firebase.database().ref(`artisans/${artisan}`).remove()
      await firebase.storage().ref(`artisanFiles/${artisan}/images/profilePicture`).delete()
      
      resolve()
      dispatch({type: 'DELETE_ARTISAN', artisan: artisan})
    })  
  }
}

