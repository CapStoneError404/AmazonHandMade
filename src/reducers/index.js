import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage'

// Import individual module's reducers here
import Errors from './Errors'
import User from './User'
import Artisans from './Artisans'
import Products from './Products'
import Transactions from './Transactions'

//Then combine them all here
const appReducer = combineReducers({ User, Errors, Artisans, Products, Transactions })

const rootReducer = (state, action) => {
  if(action.type == 'RESET_STORE' || (__DEV__ && action.type == 'LOGOUT')) {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })
    
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
