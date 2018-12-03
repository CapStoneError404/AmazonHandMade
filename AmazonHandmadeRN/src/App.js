import React, { Component } from 'react';
import { View } from 'react-native'
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation'
import { FluidNavigator } from 'react-navigation-fluid-transitions'
import DropdownAlert from 'react-native-dropdownalert'

import { Login, Register, ForgotPassword } from '@screens/Auth'
import Error from '@screens/Error'
import Launch from '@screens/Launch'
import { ArtisanList, AddArtisan } from '@screens/ArtisanHub'
import Icon from 'react-native-vector-icons/FontAwesome'


const ArtisanHubStack = createStackNavigator(
  {
    ArtisanList: { screen: ArtisanList },
    AddArtisan: { screen: AddArtisan }
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    ArtisanHub: { screen: ArtisanHubStack },
    Error: { screen: Error }
  },
  {
    navigationOptions: ({navigation}) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        var iconName
        if(routeName === 'ArtisanHub') {
          iconName = "users"
        }
        else if(routeName === 'Error') {
          iconName = 'cog'
        }
        
        return <Icon name={iconName} size={25} color={tintColor} />
      }
    })
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
    Home: { screen: TabNavigator }
  },
  {
    initialRouteName: 'Launch',
    navigationOptions: {
      gesturesEnabled: false
    }
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