import firebase from 'react-native-firebase'
import LoginWithAmazon from 'react-native-login-with-amazon'

export function amazonLogin(email, password) {
  return (dispatch, prevState) => {
    console.log("Trying to call RNLoginWithAmazon")
    LoginWithAmazon.login(() => {
      console.log("Callback called!!!!")
    })
  }
}

export function emailLogin(email, password) {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(email, password).then(currentUser => {
        user = {
          email: currentUser.user.email,
          displayName: currentUser.user.displayName,
          emailVerified: currentUser.user.emailVerified,
          photoURL: currentUser.user.photoURL,
          phoneNumber: currentUser.user.phoneNumber
        }

        resolve()
        dispatch({ type: 'LOGIN', user: user })
      }).catch(error => {
        resolve()
        dispatch({ type: 'ERROR', error: error })
      })
    })
  }
}

export function register(email, password) {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(email, password).then(currentUser => {
        user = {
          email: currentUser.user.email,
          displayName: currentUser.user.displayName,
          emailVerified: currentUser.user.emailVerified,
          photoURL: currentUser.user.photoURL,
          phoneNumber: currentUser.user.phoneNumber
        }

        resolve()
        dispatch({ type: 'LOGIN', user: user })
      }).catch(error => {
        resolve()
        dispatch({ type: 'ERROR', error: error })
      })
    })
  }
}