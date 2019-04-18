import firebase from 'react-native-firebase'
import LoginWithAmazon from 'react-native-login-with-amazon'
import { fetchConversations, sendMessage as localSendMessage } from '../screens/Messaging/actions'
import { fetchArtisans, fetchProducts } from '../screens/ArtisanHub/actions'

export function fetchAll(cgaID) {
  return (dispatch) => {
    return new Promise(async (resolve) => {
      let artisans = fetchArtisans(cgaID)
      let conversations = fetchConversations(cgaID)

      Promise.all([artisans, conversations]).then(() => resolve())
    })
  }
}

export function sendMessage(sender, message, recipients) {
  return localSendMessage(sender, message, recipients)
}

export function authLogout() {
  return (dispatch) => {
    return new Promise(async (resolve, reject) => {
      LoginWithAmazon.logout((error) => {
        if(error) {
          dispatch({ type: 'ERROR', error: error })
        }
      })

      firebase.auth().signOut()
        .then(() => {
          resolve()
          dispatch({ type: 'LOGOUT' })
        })
        .catch(error => {
          resolve()
          dispatch({ type: 'ERROR', error: error })
        })
    })
  }
}

export function displayError(msg) {
  return (dispatch) => {
    dispatch({type: 'ERROR', error: {message: msg} })
  }
}

export function clearErrors() {
  return (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }
}

export function resetStore() {
  return (dispatch) => {
    dispatch({type: 'RESET_STORE'})
  }
}
