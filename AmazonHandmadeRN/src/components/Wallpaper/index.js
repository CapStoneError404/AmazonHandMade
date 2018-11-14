import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

const backImg = require('../../../assets/images/BlurredBackground.png')

export default class Wallpaper extends Component {
  render() {
    return (
      <LinearGradient colors={['#50C8C8', '#40B7B7']} style={styles.container}>
        {this.props.children}
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      padding: '10%',
      backgroundColor: 'red'
   }
});