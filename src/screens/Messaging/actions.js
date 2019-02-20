import firebase from 'react-native-firebase'

export function sendMessage(sender, message, recipients) {
  console.log(`Sending a message from ${sender} to ${recipients} with the following content:`)
  console.log(message)
  
  return (dispatch, prevState) => { 
    return new Promise(async (resolve, reject) => {
      let sendMessage = firebase.functions().httpsCallable('sendMessage')
      
      let response = await sendMessage({
        sender: sender,
        recipients: recipients,
        message: {
          timeCreated: (new Date()).toDateString(),
          contents: message
        }        
      })

      console.log("Received data from cloud function:")
      console.log(response)
      
      resolve()
      dispatch({
        type: 'SEND_MESSAGE', 
        conversation: response.data.conversation, 
        message: response.data.message
      })
    })
  }
}

export function fetchConversations(cgaID) {
  console.log(`Fetching all conversations for cga with uid: ${cgaID}`)

  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      let snapshot = await firebase.database().ref(`amazonUsers/${cgaID}/conversations`).once('value')
      let conversationIds = snapshot.val() ? Object.keys(snapshot.val()) : []
      let conversations = (await firebase.database().ref('conversations').once('value')).val()

      console.log("Retrieved the following cga conversations ids:")
      console.log(conversationIds)
      console.log("Retrieved the following conversations:")
      console.log(conversations)

      var conversationArray = []

      for(var uid in conversations) {
        if(conversationIds.includes(uid)) {
          conversationArray.push({
            uid: uid,
            ...conversations[uid]
          })
        }
      }

      resolve()
      dispatch({type: 'GET_CONVERSATIONS', conversations: conversationsArray})
    })
  }
}

export function receiveMessage(message, conversationID) {
  console.log(`Receiving a message for the conversation with uid: ${conversationID} and the following data:`)
  console.log(message)

  return (dispatch, prevState) => {
    return new Promise(async (resolve, reject) => {
      resolve()
      dispatch({type: 'RECEIVE_MESSAGE', message: message, conversation: conversationID})
    })
  }
}