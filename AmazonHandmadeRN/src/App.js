import React, { Component } from 'react';
import { View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { FluidNavigator } from 'react-navigation-fluid-transitions'
import DropdownAlert from 'react-native-dropdownalert'

import { Login, Register, ForgotPassword } from '@screens/Auth'
import Home from '@screens/Home'
import Error from '@screens/Error'
import Launch from '@screens/Launch'

const HomeStack = createBottomTabNavigator(
  {
    Home: { screen: Home },
    Error: { screen: Error }
  }
)

const AuthStack = createStackNavigator(
  {
    Login: { screen: Login },
    Register: { screen: Register },
    ForgotPassword: { screen: ForgotPassword }
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerTransparent: true
    }
  }
)

const RootStack = FluidNavigator(
  {
    Launch: { screen: Launch },
    Auth: { screen: AuthStack },
    Home: { screen: HomeStack }
  },
  {
    initialRouteName: 'Launch'
  }
)

class Main extends Component {
  constructor(props) {
    super(props)
    this.props.clearErrors()
  }

  render() {
    if (this.props.Errs.length > 0 && this.dropdown)
      this.dropdown.alertWithType('error', 'Error', this.props.Errs.join("\n\n"))

    return (
      <View style={{ flex: 1 }}>
        <RootStack />
        <DropdownAlert
          ref={ref => this.dropdown = ref}
        />
      </View>
    )
  }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@actions'

function mapStateToProps(state) {
  return {
    Errs: state.Errs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default App