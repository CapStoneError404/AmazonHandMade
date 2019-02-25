import { AsyncButton, UserInput, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'


export default class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      confirm: "",
      waiting: false
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

  verifyFields() {
    if(this.state.password == this.state.confirm)
      return true
    else {
      this.props.displayError("Passwords dont match")
      return false
    }
  }

  submit() {
    if(this.verifyFields()) {
      this.setState({waiting: true})
      this.props.register(this.state.email, this.state.password).then(() => {
        this.setState({waiting: false})
        if(this.props.User)
          this.props.navigation.navigate("Home")
      })
    }
  }

  render() {
    return (
      <Wallpaper style={{padding: '10%'}}>
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
          spinning={this.state.waiting}
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