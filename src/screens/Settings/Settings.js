import { Wallpaper, Button } from '@components'
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


export default class Settings extends Component {
  static navigationOptions = () => {
    return {
      title: 'Settings'
    }
  }

  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.authLogout().then(() => {
      this.props.navigation.navigate("Login")
    })
  }

  render() {
    return (
      <Wallpaper style={styles.wallpaper}>
        <Button
          testID='logout_button'
          style={styles.button}
          title="Return to Login"
          color="#c14700"
          textColor="white"
          onPress={this.logout}
        />
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  wallpaper: {
    padding: 10
  },
  button: {
    flex: 0,
    height: 50
  }
})