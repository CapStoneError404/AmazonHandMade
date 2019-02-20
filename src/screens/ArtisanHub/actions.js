import firebase from 'react-native-firebase'

export function createArtisan(artisanInfo, cgaID) {
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      let addArtisan = firebase.functions().httpsCallable('addArtisan')
          
      addArtisan({
        artisanInfo: artisanInfo,
        cgaID: cgaID
      }).then(({ data }) => {
        resolve()
        dispatch({type: 'ADD_ARTISAN', artisan: data})
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