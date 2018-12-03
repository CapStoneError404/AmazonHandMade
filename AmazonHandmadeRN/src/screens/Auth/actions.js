import firebase from 'react-native-firebase'

export function emailLogin(email, password) {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password).then(currentUser => {
          dispatch({ type: 'LOGIN', user: currentUser })
          resolve()
        })
      } catch (error) {
        dispatch({ type: 'ERROR', error: error })
        reject()
      }
    })
  }
}

export function register(email, password) {
  return (dispatch, prevState) => {
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(currentUser => {
          dispatch({ type: 'LOGIN', user: currentUser })
          resolve()
        })
      } catch (error) {
        dispatch({ type: 'ERROR', error: error })
        reject()
      }
    })
  }
}