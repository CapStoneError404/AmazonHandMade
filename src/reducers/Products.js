export default function Products(state = [], action) {
  console.log("Products reducing action " + action.type)
  switch (action.type) {
  case 'ADD_PRODUCT':
    return state.concat([action.product])
  case 'GET_PRODUCTS':
    return action.products
  case 'LOG_SALE':
    return state.map(product => {
      if(product.productID === action.productId) {
        return {
          ...product,
          TimesSold: product.TimesSold + action.quantity
        }
      }

      return product
    })
  case 'DELETE_PRODUCT':
    return state.filter(product => product.uid !== action.productId)
  default:
    return state
  }
}