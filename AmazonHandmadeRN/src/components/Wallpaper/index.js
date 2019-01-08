import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import LinearGradient from 'react-native-linear-gradient';

export default class Wallpaper extends Component {
  render() {
    return (
      <LinearGradient colors={['#50C8C8', '#40B7B7']}>
        <KeyboardAwareScrollView style={styles.container} bounces='false' contentContainerStyle={[styles.content, this.props.style]}>
          {this.props.children}
        </KeyboardAwareScrollView>
      </LinearGradient>
    );
  }
}

Wallpaper.propTypes = {
  style: PropTypes.object
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
});