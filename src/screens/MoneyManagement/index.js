import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { fetchArtisans, fetchProducts } from '../ArtisanHub/actions.js'
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User,
    Artisans: state.Artisans,
    Errors: state.Errors,
    Products: state.Products,
    Payouts: state.Payouts,
    MoneyManagement: state.MoneyManagement
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchArtisans, fetchProducts, ...actions, ...globalActions }, dispatch)
}

import { default as UnconnectedMoneyManagement } from './MoneyManagement'
import { default as UnconnectedArtisanPayout } from './ArtisanPayout'
import { default as UnconnectedLogPayout } from './LogPayout'
import { default as UnconnectedPayoutList } from './PayoutList'
import { default as UnconnectedPayoutDetail } from './PayoutDetail'


const MoneyManagement = connect(mapStateToProps, mapDispatchToProps)(UnconnectedMoneyManagement)
const ArtisanPayout = connect(mapStateToProps, mapDispatchToProps)(UnconnectedArtisanPayout)
const LogPayout = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogPayout)
const PayoutList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPayoutList)
const PayoutDetail = connect(mapStateToProps, mapDispatchToProps)(UnconnectedPayoutDetail)

export {
  MoneyManagement,
  PayoutDetail,
  ArtisanPayout,
  LogPayout,
  PayoutList
}