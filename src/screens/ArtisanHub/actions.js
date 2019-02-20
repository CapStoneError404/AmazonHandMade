import firebase from 'react-native-firebase'

export function createArtisan(artisanInfo, cgaID, profilePicturePath) {
  console.log("Creating an artisan with the following info:")
  console.log(artisanInfo)
  console.log("CGA ID: " + cgaID)
  console.log("Profile Picture Path: " + profilePicturePath)

  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      let addArtisan = firebase.functions().httpsCallable('addArtisan')

      let response = await addArtisan({
        artisanInfo: artisanInfo,
        cgaID: cgaID
      })

      console.log("Received data from cloud function:")
      console.log(response)

      let artisan = {
        name: response.data.name,
        phoneNumber: response.data.phoneNumber,
        description: response.data.description,
        uid: response.data.uid
      }

      if(profilePicturePath) {
        var st_ref = await firebase.storage()
          .ref(`artisanFiles/${artisan.uid}/images/profilePicture`)
          .putFile(profilePicturePath)

          artisan.profilePictureURL = st_ref.downloadURL
        
        firebase.database().ref(`artisans/${artisan.uid}`).update(
          { profilePictureURL: st_ref.downloadURL })
      }

      resolve()
      dispatch({type: 'ADD_ARTISAN', artisan: artisan})
    })
  }
}

export function fetchArtisans(cgaID) {
  console.log("Fetching Artisans")
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      let snapshot = await firebase.database().ref(`amazonUsers/${cgaID}/artisans`).once('value')
      let artisanIds = snapshot.val() ? Object.keys(snapshot.val()) : []
      let artisans = (await firebase.database().ref('artisans').once('value')).val()

      artisanArray = []
      
      for(var uid in artisans) {
        if(artisanIds.includes(uid)) {
          artisanArray.push({
            ...artisans[uid],
            uid: uid
          })
        }
      }
      
      resolve()
      dispatch({type: 'GET_ARTISANS', artisans: artisanArray})
    })
  }
}

// action takes in current list of artisans and artisan to be deleted
// sends that artisan to reducer to be filtered out of state
//Also check that artisan has an image if so delete that from storage
export function deleteArtisan(uid) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      let deleteArtisan = firebase.functions().httpsCallable('deleteArtisan')
      
      await deleteArtisan({uid: uid})
      await firebase.storage().ref(`artisanFiles/${uid}/images/profilePicture`).delete()
      
      resolve()
      dispatch({type: 'DELETE_ARTISAN', artisanId: uid})
    })  
  }
}

