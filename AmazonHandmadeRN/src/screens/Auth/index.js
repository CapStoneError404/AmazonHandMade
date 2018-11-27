import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch);
}

import { default as UnconnectedLogin } from './Login'
import { default as UnconnectedRegister } from './Register'
import { default as UnconnectedForgotPassword } from './ForgotPassword'

const Login = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogin)
const Register = connect(mapStateToProps, mapDispatchToProps)(UnconnectedRegister)
const ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(UnconnectedForgotPassword)

export {
  Login, Register, ForgotPassword
}