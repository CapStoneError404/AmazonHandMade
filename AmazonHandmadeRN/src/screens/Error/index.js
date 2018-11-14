import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
   return {
      Errs: state.Errs
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({...actions, ...globalActions}, dispatch);
}

import Error from './Error'
export default connect(mapStateToProps, mapDispatchToProps)(Error)