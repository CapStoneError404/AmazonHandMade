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

      if (data.profilePicturePath) {
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
      dispatch({ type: 'ADD_ARTISAN', artisan: artisanObject })
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

export function fetchArtisans() {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      console.log("Fetching artisans")
      snapshot = await firebase.database().ref('artisans').once('value')
      console.log("Done")
      artisanArray = []
      artisanObject = snapshot.val()

      for (var uid in artisanObject) {
        artisanArray.push({
          ...artisanObject[uid],
          uid: uid
        })
      }

      resolve()
      dispatch({ type: 'GET_ARTISANS', artisans: artisanArray })
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
// Also check that artisan has an image if so delete that from storage
export function deleteArtisan(artisans, artisan) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      const artisanToDelete = artisans.find((item) => item.uid === artisan)
      if (artisanToDelete.profilePictureURL) {
        await firebase.storage().ref(`artisanFiles/${artisan}/images/profilePicture`).delete()
      }
      await firebase.database().ref(`artisans/${artisan}`).remove()

      resolve()
      dispatch({ type: 'DELETE_ARTISAN', artisan: artisan })
    })
  }
}

