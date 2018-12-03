import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity
} from 'react-native';

import {
  AsyncButton,
  UserInput,
  Button,
  Divider,
  Wallpaper,
  Logo
} from '@components'

export default class Login extends Component {
  constructor(props) {
    super(props)

    console.log("Props: ")
    console.log(this.props)

    this.state = {
      email: "",
      password: "",
      waiting: false
    }

    this.submit = this.submit.bind(this)
    this.createAccount = this.createAccount.bind(this)
    this.forgotPassword = this.forgotPassword.bind(this)
  }

  submit() {
    this.setState({waiting: true})
    this.props.emailLogin(this.state.email, this.state.password).then(() => {
      this.setState({waiting: false})
    })
  }

  createAccount() {
    this.props.navigation.navigate('Register')
  }

  forgotPassword() {
    this.props.navigation.navigate('ForgotPassword')
  }

  render() {
    return (
      <Wallpaper style={{padding: '10%'}}>
        <Logo />
        <UserInput
          iconName="envelope"
          placeholder="Email"
          value={this.state.email}
          onChangeText={(newText) => this.setState({ email: newText })}
        />
        <UserInput
          iconName="key"
          placeholder="Password"
          value={this.state.password}
          onChangeText={(newText) => this.setState({ password: newText })}
          secureTextEntry={true}
        />
        <AsyncButton
          title="Submit"
          color="#c14700"
          textColor="white"
          onPress={this.submit}
          spinning={this.state.waiting}
        />
        <View style={styles.createForgot}>
          <TouchableOpacity
            onPress={this.createAccount}>
            <Text style={styles.createForgotText}>Create Account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.forgotPassword}>
            <Text style={styles.createForgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 3,
    textAlign: 'center',
    fontSize: 60,
    color: 'white',
    marginTop: 60
  },
  email: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createForgot: {
    flex: 0,
    height: 20,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5
  },
  socialDiv: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 20
  },
  divText: {
    color: '#444444',
    fontWeight: 'bold'
  },
  createForgotText: {
    color: 'white',
    fontSize: 15
  }
})