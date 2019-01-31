import { Logo, Wallpaper } from '@components';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';


export default class Launch extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    if(this.props.User)
      this.props.navigation.navigate("Home")
    else
      this.props.navigation.navigate("Login")
  }

  render() {
    return (
      <Wallpaper>
        <Logo />
      </Wallpaper>
    )
  }
}


const styles = StyleSheet.create({
   container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center',
   },
 });