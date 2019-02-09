import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    User: state.User,
    Artisans: state.Artisans,
    Errors: state.Errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch);
}

import { default as UnconnectedProductDetail } from './ProductDetail'
import { default as UnconnectedAddProduct } from './AddProduct'

const ProductDetail = connect(mapStateToProps, mapDispatchToProps)(UnconnectedProductDetail)
const AddProduct = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAddProduct)

export {
   ProductDetail,
   AddProduct
 }

//We all need to add our own connect methods like it has been done under screens/ArtisanHub/index.js