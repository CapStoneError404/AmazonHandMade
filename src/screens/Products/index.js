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

//We all need to add our own connect methods like it has been done under screens/ArtisanHub/index.js

import { default as UnconnectedAddProduct } from './AddProduct'
import { default as UnconnectedProductList } from './ProductList'
import { default as UnconnedtedProductDetail } from './ProductDetail'
import { default as UnconnectedLogSale } from './LogSale'

const AddProduct = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAddProduct)
const ProductList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedProductList)
const ProductDetail = connect(mapDispatchToProps,mapDispatchToProps)(UnconnedtedProductDetail)
const LogSale = connect(mapStateToProps, mapDispatchToProps)(UnconnectedLogSale)

export { AddProduct, ProductDetail, ProductList, LogSale }
