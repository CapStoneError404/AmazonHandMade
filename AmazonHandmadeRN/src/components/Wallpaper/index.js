import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { Platform, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview'

export default class Wallpaper extends Component {
  render() {
    return (
      <LinearGradient colors={['#50C8C8', '#40B7B7']}>
        <KeyboardAwareScrollView style={styles.container} bounces='false' contentContainerStyle={styles.content}>
          {this.props.children}
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: '10%'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});