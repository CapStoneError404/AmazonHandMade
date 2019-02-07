import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions';
import * as globalActions from '@actions';

function mapStateToProps(state) {
  return {
    User: state.User,
    Artisans: state.Artisans,
    Errors: state.Errors,
    Conversations: state.Conversations
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch);
}

import { default as UnconnectedMessageList } from './MessageList';
import { default as UnconnectedMessage } from './Message';

const MessageList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMessageList)
const Message = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMessage)


export {
  MessageList,
  Message
}