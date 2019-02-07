import firebase from 'react-native-firebase'
import LoginWithAmazon from 'react-native-login-with-amazon'

export function amazonLogin(email, password) {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      LoginWithAmazon.login((error, accessToken, profileData) => {
        if(error) {
          resolve()
          dispatch({ type: 'ERROR', error: error })
        } else {
          let functionCall = firebase.functions().httpsCallable('loginWithAmazon')
          
          functionCall({
            accessToken: accessToken,
            userInfo: {
              email: profileData.email,
              name: profileData.name,
              user_id: profileData.user_id
            }
          }).then(({ data }) => {
            console.log("Received response with token: " + data.token)
            firebase.auth().signInWithCustomToken(data.token).then(currentUser => {
              user = {
                email: currentUser.user.email,
                displayName: currentUser.user.displayName,
                emailVerified: currentUser.user.emailVerified,
                photoURL: currentUser.user.photoURL,
                phoneNumber: currentUser.user.phoneNumber
              }

              resolve()
              dispatch({ type: 'LOGIN', user: user })
            })
          }).catch(error => {
            resolve()
            dispatch({ type: 'ERROR', error: error })
          })
        }
      })
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
