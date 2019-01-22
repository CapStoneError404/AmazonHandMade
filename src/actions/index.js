import firebase from 'react-native-firebase'

export function authLogout() {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
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