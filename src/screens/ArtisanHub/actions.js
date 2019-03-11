import firebase from 'react-native-firebase'

export function createArtisan(artisanInfo, cgaID, profilePicturePath) {
  console.log("Creating an artisan with the following info:")
  console.log(artisanInfo)
  console.log("CGA ID: " + cgaID)
  console.log("Profile Picture Path: " + profilePicturePath)

  return (dispatch) => { 
    return new Promise(async (resolve) => {
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

      if (profilePicturePath) {
        var st_ref = await firebase.storage()
          .ref(`artisanFiles/${artisan.uid}/images/profilePicture`)
          .putFile(profilePicturePath)

        artisan.profilePictureURL = st_ref.downloadURL
        firebase.database().ref(`artisans/${artisan.uid}`).update(
          { profilePictureURL: st_ref.downloadURL })
      }

      resolve(artisan)
      dispatch({type: 'ADD_ARTISAN', artisan: artisan})
    })
  }
}

//Updates artisan info and if image is passed in than delete current one in storage,
//update it with new image picked in both storage and database
export const saveArtisan = ({ name, phoneNumber, description, profilePicturePath, uid }) => {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      await firebase.database().ref(`/artisans/${uid}`)
        .update({ name, phoneNumber, description })

      artisanObject = {
        name,
        phoneNumber,
        description,
        uid
      }

      if (profilePicturePath) {
        await firebase.storage().ref(`artisanFiles/${uid}/images/profilePicture`).delete()
        let st_ref = await firebase.storage()
          .ref(`artisanFiles/${uid}/images/profilePicture`)
          .putFile(profilePicturePath)

        artisanObject.profilePictureURL = st_ref.downloadURL
        await firebase.database().ref(`/artisans/${uid}`).update({ profilePictureURL: st_ref.downloadURL })
      }

      resolve()
      dispatch({ type: 'SAVE_ARTISAN', artisan: artisanObject })
    })
  }
}

//Fetch all products associated with the specfic artisan we current viewing
export function fetchProducts(artisanID) {
  console.log("Fetching Products artisan ID" + artisanID)
  return (dispatch) => {
    return new Promise(async (resolve) => {
      let snapshot = await firebase.database().ref('products').once('value')
      let productArray = []
      let productObject = snapshot.val()

      for (var productID in productObject) {
        productArray.push({
          ...productObject[productID],
          productID: productID
        })
      }

      let productSnapshot = await firebase.database().ref(`artisans/${artisanID}/products`).once('value')
      let productKeys = Object.keys(productSnapshot.val())
      productArray = productArray.filter(obj => productKeys.includes(obj.productID))

      resolve()
      dispatch({ type: 'GET_PRODUCTS', products: productArray })
    })
  }
}

// action takes in current list of artisans and artisan to be deleted
// sends that artisan to reducer to be filtered out of state
//Also check that artisan has an image if so delete that from storage
export function deleteArtisan(artisans, uid) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      let deleteArtisan = firebase.functions().httpsCallable('deleteArtisan')
      
      await deleteArtisan({uid: uid})
      await firebase.storage().ref(`artisanFiles/${uid}/images/profilePicture`).delete()
      
      resolve()
      dispatch({ type: 'DELETE_ARTISAN', artisanId: uid })
    })
  }
}

