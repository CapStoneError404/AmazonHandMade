import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'
import {
  UserInput,
  AsyncButton,
  Wallpaper
} from '@components'

export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      confirm: ""
    }

    this.submit = this.submit.bind(this)
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleConfirmChange = this.handleConfirmChange.bind(this)
  }

  handleEmailChange(newText) {
    this.setState({ email: newText })
  }

  handlePasswordChange(newText) {
    this.setState({ password: newText })
  }

  handleConfirmChange(newText) {
    this.setState({ confirm: newText })
  }

  submit() {
    this.props.register(this.state.email, this.state.password)
  }

  render() {
    return (
      <Wallpaper>
        <Text style={styles.logo}>Register</Text>
        <UserInput
          iconName="envelope"
          placeholder="Email"
          value={this.state.email}
          onChangeText={this.handleEmailChange}
        />
        <UserInput
          iconName="key"
          placeholder="Password"
          value={this.state.password}
          onChangeText={this.handlePasswordChange}
          secureTextEntry={true}
        />
        <UserInput
          iconName="key"
          placeholder="Confirm Password"
          value={this.state.confirm}
          onChangeText={this.handleConfirmChange}
          secureTextEntry={true}
        />
        <AsyncButton
          title="Register"
          color="#c14700"
          textColor="white"
          onPress={this.submit}
        />
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 3,
    fontFamily: 'Bitter-Regular',
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
})