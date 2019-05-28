import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import I18n, {setLocale} from "../../utils/i18n"

class Translate extends Component {
  constructor(props) {
    super(props)

    this.getTranslation = this.getTranslation.bind(this)
  }
  
  getTranslation(string){
    const lang = this.props.Settings.language
    
    return I18n.t(string, {locale: lang})
  }
    
  render() {
    return (
      <Text style={[styles.containerStyle, this.props.style]}> {this.getTranslation(this.props.transString)} </Text>
    )
  }
}

function mapStateToProps(state) {
  return {
    Errors: state.Errors,
    Settings: state.Settings
  }
}

const styles = {
  containerStyle: {}
}

export default connect(mapStateToProps)(Translate)