import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchArtisans, fetchProducts } from '../ArtisanHub/actions.js'
import { fetchConversations } from '../Messaging/actions.js'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User,
    Errors: state.Errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({fetchArtisans, fetchProducts, fetchConversations, ...globalActions}, dispatch)
}

import Launch from './Launch'
export default connect(mapStateToProps, mapDispatchToProps)(Launch)