import firebase from 'react-native-firebase'
import { parse } from '@babel/parser';

export function createProduct(data, artisanID) {
  return (dispatch) => { 
    return new Promise(async (resolve) => {
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
      
      productObject = {
        MainCategory: data.mainCategory,
        SubCategory: data.subCategory,
        Title: data.title,
        Description: data.description,
        Gender: data.gender,
        StandardPrice: data.standardPrice,
        SellerSKU: data.sellerSKU,
        Quantity: data.quantity,
        ProductionTime: data.productionTime,
        TimesSold: data.timesSold,
        ProductID: db_ref.key
      }

      if(data.mainPicture) {
        var st_ref = await firebase.storage()
          .ref(`productFiles/${db_ref.key}/images/mainPicture`)
          .putFile(data.mainPicture)
      
        productObject.mainPictureURL = st_ref.downloadURL
        
        console.log("Put photo download url into db")
        firebase.database().ref(`products/${productObject.ProductID}`).update(
          { mainPictureURL: st_ref.downloadURL })
      }

      await firebase.database().ref(`artisans/${artisanID}/products`).update({
        [db_ref.key]: true
      })
   
      resolve()
      dispatch({type: 'ADD_PRODUCT', product: productObject})
    })
  }
}

export function logSale({productId, quantity}) {
  return (dispatch) => { 
    return new Promise(async (resolve) => {
      var totalSales = 0
      await firebase.database().ref(`products/${productId}/TimesSold`)
        .transaction(currentTimesSold => {
          totalSales = (currentTimesSold || 0) + quantity
          return totalSales
        })

      resolve(totalSales)
      dispatch({type: 'LOG_SALE', productId: productId, quantity: quantity})
    })
  }
}

{/*
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