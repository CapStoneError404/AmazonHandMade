export default function Conversations(state = [], action) {
  console.log("Conversations reducing action " + action.type);
  switch (action.type) {
    case 'SEND_MESSAGE':
      var newState = []
      var conversationToUpdate

      for(var conversation in state) {
        if(conversation.uid !== action.conversation)
          newState.push(conversation)
        else
          conversationToUpdate = conversation
      }

      conversationToUpdate.messages.push(action.message)
      newState.push(conversationToUpdate)
      return newState
    case 'GET_CONVERSATIONS':
      return action.conversations
    default:
      return state;
  }
}