import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
   return {
      
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({...actions, ...globalActions}, dispatch);
}

import Home from './Home'
export default connect(mapStateToProps, mapDispatchToProps)(Home)