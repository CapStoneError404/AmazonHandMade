import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './actions'
import * as globalActions from '@actions'

function mapStateToProps(state) {
  return {
    Artisans: state.Artisans
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...actions, ...globalActions }, dispatch);
}

import { default as UnconnectedArtisanList } from './ArtisanList'
import { default as UnconnectedAddArtisan } from './AddArtisan'

const ArtisanList = connect(mapStateToProps, mapDispatchToProps)(UnconnectedArtisanList)
const AddArtisan = connect(mapStateToProps, mapDispatchToProps)(UnconnectedAddArtisan)

export {
  ArtisanList,
  AddArtisan
}