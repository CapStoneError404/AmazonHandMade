export default function Conversations(state = [], action) {
  console.log("Conversations reducing action " + action.type);
  switch (action.type) {
    case 'SEND_MESSAGE':
      var newState = state.filter(cnv => cnv.uid !== action.conversation.uid)
      return newState.concat([action.conversation])
    case 'GET_CONVERSATIONS':
      return action.conversations
    default:
      return state;
  }
}