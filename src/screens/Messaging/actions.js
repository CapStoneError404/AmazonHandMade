import firebase from 'react-native-firebase'

export function sendMessage(sender, message, recipients) {
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      let functionCall = firebase.functions().httpsCallable('sendMessage')
          
      functionCall({
        sender: sender,
        recipients: recipients,
        message: {
          contents: message,
          timeCreated: Date.now()
        }
      }).then(({ data }) => {
        console.log(data)
        resolve()
        //dispatch({type: 'SEND_MESSAGE', conversation: data})
      })
    })
  }
}

export function fetchConversations() {
  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      console.log("Fetching all conversations")
      snapshot = await firebase.database().ref('conversations').once('value')
      
      conversationArray = []
      conversationsObject = snapshot.val()
      for(var uid in conversationsObject) {
        conversationArray.push({
          ...conversationsObject[uid],
          uid: uid
        })
      }
      resolve()
      dispatch({type: 'GET_CONVERSATIONS', conversations: conversationArray})
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