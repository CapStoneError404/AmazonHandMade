import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
   return {
      User: state.User,
      Artisans: state.Artisans,
      Errors: state.Errors,
      Products: state.Products
   }
}

function mapDispatchToProps(dispatch) {
   return bindActionCreators({ ...actions, ...globalActions }, dispatch)
}

import { default as UnconnectedTransactions } from './Transactions'


const Transactions = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTransactions)


export {
   Transactions

}