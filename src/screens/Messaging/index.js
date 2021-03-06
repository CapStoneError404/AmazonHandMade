import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User,
    Artisans: state.Artisans,
    Errors: state.Errors,
    Conversations: state.Conversations
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch)
}

import { default as UnconnectedConversationList } from './ConversationList'
import { default as UnconnectedConversation } from './Conversation'
import { default as UnconnectedNewConversation } from './NewConversation'

const ConversationList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedConversationList)
const Conversation = connect(mapStateToProps, mapDispatchToProps)(UnconnectedConversation)
const NewConversation = connect(mapStateToProps, mapDispatchToProps)(UnconnectedNewConversation)


export {
  ConversationList,
  Conversation,
  NewConversation
}