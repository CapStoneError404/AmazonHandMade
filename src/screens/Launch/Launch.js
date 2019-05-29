import { Logo, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, Text, ActivityIndicator } from 'react-native'

export default class Launch extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(this.props.User) {
      this.props.navigation.navigate("Home")
    }
    else
      this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
        <ActivityIndicator
          size='large'
          animating={true}
          color='white'
        />
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    
  }
})