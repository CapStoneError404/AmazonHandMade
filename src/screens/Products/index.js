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

//We all need to add our own connect methods like it has been done under screens/ArtisanHub/index.js

import { default as UnconnectedAddProduct } from './AddProduct'
import { default as UnconnectedProductDetail } from './ProductDetail'

const AddProduct = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAddProduct)
const ProductDetail = connect(mapStateToProps, mapDispatchToProps)(UnconnectedProductDetail)

export {
  AddProduct,
  ProductDetail
}
