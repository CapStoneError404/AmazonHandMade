import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class Wallpaper extends Component {
  render() {
    return (
      <LinearGradient style={[styles.content, this.props.style]} colors={['#50C8C8', '#40B7B7']}>
        {this.props.children}
      </LinearGradient>
    )
  }
}

Wallpaper.propTypes = {
  style: PropTypes.object
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
})