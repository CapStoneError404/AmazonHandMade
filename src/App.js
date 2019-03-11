import React, { Component } from 'react';
import { View } from 'react-native';
import {
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';
import DropdownAlert from 'react-native-dropdownalert';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Login, Register, ForgotPassword } from '@screens/Auth';
import Settings from '@screens/Settings';
import Launch from '@screens/Launch';
import {
  ArtisanList,
  AddArtisan,
  ArtisanDetail,
  EditArtisan
} from '@screens/ArtisanHub';
import { Conversation, ConversationList, NewConversation } from '@screens/Messaging';
import { AddProduct, ProductDetail } from '@screens/Products';

const ArtisanHubStack = createStackNavigator({
  ArtisanList: ArtisanList,
  AddArtisan: AddArtisan,
  ArtisanDetail: ArtisanDetail,
  EditArtisan: EditArtisan,
  AddProduct: AddProduct,
  ProductDetail: ProductDetail
});

const MessageNavigator = createStackNavigator(
  {
    Conversations: ConversationList,
    Conversation: Conversation,
    NewConversation: NewConversation
  }
)

const TabNavigator = createBottomTabNavigator(
  {
    ArtisanHub: ArtisanHubStack,
    Settings: Settings,
    Messages: MessageNavigator
  },
  {
    initialRouteName: 'ArtisanHub',
    order: ['ArtisanHub', 'Messages' ,'Settings'],
    animationEnabled: true,
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state
        var iconName
        if (routeName === 'ArtisanHub') {
          iconName = 'users'
        } else if (routeName === 'Settings') {
          iconName = 'cog'
        } else if (routeName === 'Messages') {
            iconName = 'comments'
        }

        return <Icon name={iconName} size={25} color={tintColor} />
      },
      tabBarVisible: true
    })
  }
);

const AuthStack = createStackNavigator(
  {
    Login: Login,
    Register: Register,
    ForgotPassword: ForgotPassword
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {
      headerTransparent: true
    }
  }
);

const RootStack = createSwitchNavigator(
  {
    Launch: Launch,
    Auth: AuthStack,
    Home: TabNavigator
  },
  {
    initialRouteName: 'Launch'
  }
);

class Main extends Component {
  constructor(props) {
    super(props);
    this.props.clearErrors();
  }

  render() {
    if (this.props.Errors.length > 0 && this.dropdown)
      this.dropdown.alertWithType(
        'error',
        'Error',
        this.props.Errors.join('\n\n')
      );

    return (
      <View style={{ flex: 1 }}>
        <RootStack />
        <DropdownAlert ref={ref => (this.dropdown = ref)} />
      </View>
    );
  }
}

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '@actions';

function mapStateToProps(state) {
  return {
    Errors: state.Errors
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);

export default App;
