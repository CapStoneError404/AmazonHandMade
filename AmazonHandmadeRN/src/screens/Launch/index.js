import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {

  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(globalActions, dispatch);
}

import Launch from './Launch'
export default connect(mapStateToProps, mapDispatchToProps)(Launch)