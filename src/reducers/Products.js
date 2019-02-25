export default function Products(state = [], action) {
  console.log("Products reducing action " + action.type)
  switch (action.type) {
  case 'ADD_PRODUCT':
    return state.concat([action.product])
  case 'GET_PRODUCTS':
    return action.products
  case 'DELETE_PRODUCT':
    return state.filter(product => product.uid !== action.product.uid)
  default:
    return state
  }
}