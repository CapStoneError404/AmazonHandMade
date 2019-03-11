import firebase from 'react-native-firebase'
import LoginWithAmazon from 'react-native-login-with-amazon'

export function fetchArtisans(cgaID) {
  console.log("Fetching Artisans")
  return (dispatch) => {
    return new Promise(async (resolve) => {
      let snapshot = await firebase.database().ref(`amazonUsers/${cgaID}/artisans`).once('value')
      let artisanIds = snapshot.val() ? Object.keys(snapshot.val()) : []
      let artisans = (await firebase.database().ref('artisans').once('value')).val()

      artisanArray = []
      
      for(var uid in artisans) {
        if(artisanIds.includes(uid)) {
          artisanArray.push({
            ...artisans[uid],
            uid: uid
          })
        }
      }
      
      resolve()
      dispatch({type: 'GET_ARTISANS', artisans: artisanArray})
    })
  }
}

export function sendMessage(sender, message, recipients) {
  console.log(`Sending a message from ${sender} to ${recipients} with the following content:`)
  console.log(message)
  
  return (dispatch) => { 
    return new Promise(async (resolve) => {
      let sendMessage = firebase.functions().httpsCallable('sendMessage')
      
      let response = await sendMessage({
        sender: sender,
        recipients: recipients,
        message: {
          timeCreated: (new Date()).valueOf(),
          contents: message
        }        
      })

      console.log("Received data from cloud function:")
      console.log(response)
      
      resolve()
      dispatch({
        type: 'SEND_MESSAGE', 
        conversation: convertConversation(response.data)
      })
    })
  }
}

function convertConversation(conversationObject) {
  console.log("Converting conversation object:")
  console.log(conversationObject)
  
  var messages = []

  for(var mUID in conversationObject.messages) {
    messages.push({
      uid: mUID,
      ...conversationObject.messages[mUID]
    })
  }

  messages.sort((first, second) => {
    return first.timeCreated - second.timeCreated
  })

  return {
    uid: conversationObject.uid,
    participants: Object.keys(conversationObject.participants),
    messages: messages
  }
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
