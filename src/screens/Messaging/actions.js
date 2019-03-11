import firebase from 'react-native-firebase'

export function fetchConversations(cgaID) {
  console.log(`Fetching all conversations for cga with uid: ${cgaID}`)

  return (dispatch) => {
    return new Promise(async (resolve) => {
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
          let conversationObject = {
            uid: uid,
            ...conversations[uid]
          }
          conversationArray.push(convertConversation(conversationObject))
        }
      }

      resolve()
      dispatch({type: 'GET_CONVERSATIONS', conversations: conversationArray})
    })
  }
}

export function receiveMessage(message, conversationID) {
  console.log(`Receiving a message for the conversation with uid: ${conversationID} and the following data:`)
  console.log(message)

  return (dispatch) => {
    return new Promise(async (resolve) => {
      resolve()
      dispatch({type: 'RECEIVE_MESSAGE', message: message, conversation: conversationID})
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