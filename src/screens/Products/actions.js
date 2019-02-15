import firebase from 'react-native-firebase'

export function createProduct(data, artisanID) {
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      console.log("Pushing a new product to db...")
      var db_ref = await firebase.database().ref('products/').push({
        MainCategory: data.mainCategory,
        SubCategory: data.subCategory,
        Title: data.title,
        Description: data.description,
        Gender: data.gender,
        StandardPrice: data.standardPrice,
        SellerSKU: data.sellerSKU,
        Quantity: data.quantity,
        ProductionTime: data.productionTime,
        TimesSold: data.timesSold
      })
      console.log("Finished pushing product to db")

      productObject = {
        mainCategory: data.mainCategory,
        subCategory: data.subCategory,
        title: data.title,
        description: data.description,
        gender: data.gender,
        standardPrice: data.standardPrice,
        sellerSKU: data.sellerSKU,
        quantity: data.quantity,
        productionTime: data.productionTime,
        timesSold: data.timesSold,
        productID: db_ref.key
      }

      if(data.mainPicture) {
        console.log("Pushing main photo to storage")
        
        var st_ref = await firebase.storage()
          .ref(`productFiles/${db_ref.key}/images/mainPicture`)
          .putFile(data.mainPicture)
        console.log("Finished pushing main picture to storage")

        productObject.mainPictureURL = st_ref.downloadURL
        
        console.log("Fetching photo download url")
        firebase.database().ref(`products/${productObject.productID}`).update(
          { mainPictureURL: st_ref.downloadURL })
      }

      console.log("Connecting product to artisan in db...")
      var snapshot = firebase.database().ref(`artisans/${artisanID}/products`).once('value')
      await firebase.database().ref(`artisans/${artisanID}/products`).update({
        [db_ref.key]: true
      })
      
      console.log("Finished connecting")

      resolve()
      dispatch({type: 'ADD_PRODUCT', product: productObject})
    })
  }
}
{/*
//Fetch all products (so all CGA products) or the ones associated with a specific artisan
export function fetchProducts(artisanID = "") {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      console.log("Fetching products")
      let snapshot = await firebase.database().ref('products').once('value')
      console.log("Done")
      let productArray = []
      let productObject = snapshot.val()
      
      for(var productID in productObject) {
        productArray.push({
          ...productObject[productID],
          productID: productID
        })
      }

      //if artisanID is provided, narrow the products list
      if (artisanID !== ""){
        let artisanProds = await firebase.database().ref(`artisan/${artisanID}/products`).once('value').val()
        productArray = productArray.filter(obj => artisanProds.includes(obj.productID))
      }

      resolve()
      dispatch({type: 'GET_PRODUCTS', products: productArray})
    })
  }
}

// action takes in current list of products and product to be deleted
// sends that product to reducer to be filtered out of state

export function deleteProduct(products, product, artisan) {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      //Remove Product from Artisan 
      await firebase.database().ref(`artisans/${artisan.artisanID}/products/${product.productID}`).remove()
      //Remove product
      await firebase.database().ref(`products/${product.productID}`).remove()
      //Remove product storage
      await firebase.storage().ref(`productFiles/${product.productID}/images/mainPicture`).delete() 
      resolve()
      dispatch({type: 'DELETE_PRODUCT', product: product})
    })  
  }
}
*/}