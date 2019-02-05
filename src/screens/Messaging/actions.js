import firebase from 'react-native-firebase'

export function sendMessage(sender, message, recipients) {
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      fetch('https://us-central1-handmade-error-404.cloudfunctions.net/sendMessage', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: sender,
          message: message,
          timeCreated: (new Date()).toDateString(),
          recipients: recipients
        })
      }).then(res => {
        return res.json()
      }).then(res => {
        resolve()
        dispatch({type: 'SEND_MESSAGE', conversation: res.conversation, message: res.message})
      })
    })
  }
}

export function fetchConversations() {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      console.log("Fetching all conversations")
      snapshot = await firebase.database().ref('conversations').once('value')
      
      conversations = snapshot.val()
      resolve()
      dispatch({type: 'GET_CONVERSATIONS', conversations: conversations})
    })
  }
}

export function fetchMessages(conversation) {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      console.log("Fetching messages")
      snapshot = await firebase.database()
        .ref('conversations')
        .ref(conversation)
        .once('value')

      messages = []
      conversationObject = snapshot.val()
      
      for(var uid in conversationObject.messages) {
        messages.push({
          ...conversationObject.messages[uid],
          uid: uid
        })
      }
      
      resolve()
      dispatch({type: 'GET_MESSAGES', conversation: conversation, messages: messages})
    })
  }
}