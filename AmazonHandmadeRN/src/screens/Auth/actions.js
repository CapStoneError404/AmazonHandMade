import firebase from 'react-native-firebase'

export function emailLogin(email, password) {
   return async(dispatch, prevState) => {
      try {
         const currentUser = await firebase.auth().signInWithEmailAndPassword(email, password)
         dispatch({type: 'LOGIN', user: currentUser})
      } catch (error) {
         dispatch({type: 'ERROR', error: error})
      }
   }
}

export function register(email, password) {
   return async(dispatch, prevState) => {
      try {
         const currentUser = await firebase.auth().createUserWithEmailAndPassword(email, password)
         dispatch({type: 'LOGIN', user: currentUser})
      } catch (error) {
         dispatch({type: 'ERROR', error: error})
      }
   }
}