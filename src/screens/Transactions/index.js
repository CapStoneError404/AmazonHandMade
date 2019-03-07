import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User,
    Artisans: state.Artisans,
    Errors: state.Errors,
    Products: state.Products,
    Payouts: state.Payouts
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch)
}

import { default as UnconnectedTransactions } from './Transactions'
import { default as UnconnectedArtisanPayout } from './ArtisanPayout'
import { default as UnconnectedLogPayout } from './LogPayout'
import { default as UnconnectedPayoutList } from './PayoutList'



const Transactions = connect(mapStateToProps, mapDispatchToProps)(UnconnectedTransactions)
const ArtisanPayout = connect(mapStateToProps, mapDispatchToProps)(UnconnectedArtisanPayout)
const LogPayout = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogPayout)
const PayoutList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPayoutList)


export {
  Transactions,
  ArtisanPayout,
  LogPayout,
  PayoutList
}