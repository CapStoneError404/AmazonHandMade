import firebase from 'react-native-firebase'
import LoginWithAmazon from 'react-native-login-with-amazon'

export function authLogout() {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      LoginWithAmazon.logout((error) => {
        console.log("Loggin out of amazon")
        if(error) {
          console.log(error)
        } else {
          console.log("Logged out")
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
  return (dispatch, prevState) => {
    dispatch({type: 'ERROR', error: {message: msg} })
  }
}

export function clearErrors() {
  return (dispatch, prevState) => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }
}

export function resetStore() {
  return (dispatch, prevState) => {
    dispatch({type: 'RESET_STORE'})
  }
}