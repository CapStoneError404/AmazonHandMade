import firebase from 'react-native-firebase'

export function authLogout() {
  return (dispatch, prevState) => {
    firebase.auth().signOut()
      .then(() => dispatch({ type: 'LOGOUT' }))
      .catch(error => dispatch({ type: 'ERROR', error: error }))
  }
}

export function displayError(msg) {
  return (dispatch, prevState) => {
    dispatch({type: 'ERROR', error: {message: msg} })
  }
}

export function clearErrors() {
  return (dispatch, prevState) => {
    dispatch({ type: 'CLEAR_ERRS' })
  }
}