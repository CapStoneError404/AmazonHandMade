import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User,
    Artisans: state.Artisans,
    Errors: state.Errors,
    ActionCenter: state.ActionCenter,
    Conversations: state.Conversations,
    Settings: state.Settings
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch)
}

import { default as UnconnectedActionCenter } from './ActionCenter'

const ActionCenter = connect(mapStateToProps, mapDispatchToProps)(UnconnectedActionCenter)

export {
  ActionCenter
}