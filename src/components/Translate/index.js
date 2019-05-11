import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text } from 'react-native'
import I18n, {setLocale} from "../../utils/i18n"

class Translate extends Component {  
  constructor(props) {
    super(props);
  
    this.state = {
      language: "en"
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.Settings.language) {
      this.setState({language: nextProps.Settings.language})
    }
  }
  
  render() {
    const lang = this.state.language
    
    return (
      <Text style={[styles.containerStyle, this.props.style]}> {I18n.t({this.props.transString}, {locale: lang})} </Text>
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