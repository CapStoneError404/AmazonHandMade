import { Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, Text } from 'react-native'

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Wallpaper>
        <Text style={styles.logo}>Handmade</Text>
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
  }
})