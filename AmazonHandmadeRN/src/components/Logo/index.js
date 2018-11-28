import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <Image style={styles.logo} resizeMode='contain' source={require('../../../assets/images/1x/HandmadeLogo.png')} />
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 4,
    height: undefined,
    width: undefined
  }
});