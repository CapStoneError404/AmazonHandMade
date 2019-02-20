import firebase from 'react-native-firebase'

export function createArtisan(artisanInfo, cgaID) {
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      let addArtisan = firebase.functions().httpsCallable('addArtisan')

      addArtisan({
        artisanInfo: artisanInfo,
        cgaID: cgaID
      }).then(({ data }) => {
        let artisan = {
          name: data.name,
          phoneNumber: data.phoneNumber,
          description: data.description,
          uid: data.uid,
          profilePictureURL: data.profilePictureURL
        }

        resolve()
        dispatch({type: 'ADD_ARTISAN', artisan: artisan})
      }).catch( error => {
        resolve()
        dispatch({type: 'ERROR', message: error})
      })
    })
  }
}

export function fetchArtisans() {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
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
//Also check that artisan has an image if so delete that from storage
export function deleteArtisan(uid) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      let deleteArtisan = firebase.functions().httpsCallable('deleteArtisan')
      
      deleteArtisan({
        uid: artisan
      }).then(() => {
        resolve()
        dispatch({type: 'DELETE_ARTISAN', artisan: artisan})
      }).catch(error => {
        resolve()
        dispatch({type: 'ERROR', message: error})
      })
    })  
  }
}

