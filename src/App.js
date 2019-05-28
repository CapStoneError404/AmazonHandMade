import React, { Component } from 'react'
import { View } from 'react-native'
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator,
  createAppContainer
} from 'react-navigation'
import DropdownAlert from 'react-native-dropdownalert'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Login, Register, ForgotPassword } from '@screens/Auth'
import Settings from '@screens/Settings'
import Launch from '@screens/Launch'
import {
  ArtisanList,
  AddArtisan,
  ArtisanDetail,
  EditArtisan
} from '@screens/ArtisanHub'
import { 
  AddProduct, 
  ProductDetail, 
  ProductList,
  LogSale
} from '@screens/Products'
import {
  MoneyManagement,
  ArtisanPayout,
  LogPayout,
  PayoutList,
  PayoutDetail
} from '@screens/MoneyManagement'
import { 
  Conversation, 
  ConversationList, 
  NewConversation 
} from '@screens/Messaging';

const ArtisanHubStack = createStackNavigator({
  ArtisanList: ArtisanList,
  AddArtisan: AddArtisan,
  ArtisanDetail: ArtisanDetail,
  EditArtisan: EditArtisan,
  AddProduct: AddProduct,
  ProductDetail: ProductDetail,
  ProductList: ProductList,
  LogSale: LogSale
})

const MoneyManagementStack = createStackNavigator({
  MoneyManagement: MoneyManagement,
  PayoutList: PayoutList,
  ArtisanPayout: ArtisanPayout,
  LogPayout: LogPayout,
  PayoutDetail: PayoutDetail
})

const MessageNavigator = createStackNavigator(
  {
    Conversations: ConversationList,
    Conversation: Conversation,
    NewConversation: NewConversation
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    "Artisan Hub": ArtisanHubStack,
    Settings: Settings,
    "Finances": MoneyManagementStack,
    "Messages": MessageNavigator
  },
  {
    initialRouteName: 'Artisan Hub',
    order: ['Artisan Hub', 'Messages', 'Finances', 'Settings'],
    animationEnabled: true,
    defaultNavigationOptions: ({ navigation }) => {
      return {
        tabBarIcon: ({ tintColor }) => {
          const { routeName } = navigation.state
          var iconName
          if (routeName === 'Artisan Hub') {
            iconName = 'users'
          } else if (routeName === 'Settings') {
            iconName = 'cog'
          } else if (routeName === 'Finances') {
            iconName = 'dollar'
          } else if (routeName === 'Messages') {
            iconName = 'comments'
          }
          return <Icon name={iconName} size={25} color={tintColor} />
        },
        tabBarVisible: true
      }
    }
  }
)

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    ForgotPassword: ForgotPassword
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerTransparent: true
    }
  }
)

const RootStack = createSwitchNavigator(
  {
    Launch: Launch,
    Auth: AuthStack,
    Home: TabNavigator
  },
  {
    initialRouteName: 'Launch'
  }
)

const Navigation = createAppContainer(RootStack)

class Main extends Component {
  constructor(props) {
    super(props)
    this.props.clearErrors()
  }

  render() {
    if (this.props.Errors.length > 0 && this.dropdown)
      this.dropdown.alertWithType(
        'error',
        'Error',
        this.props.Errors.join('\n\n')
      )

    return (
      <View style={{ flex: 1 }}>
        <Navigation />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    )
  }
}

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as actions from '@actions'
import { Root } from 'native-base';

function mapStateToProps(state) {
  return {
    Errors: state.Errors
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch)
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main)

export default App
