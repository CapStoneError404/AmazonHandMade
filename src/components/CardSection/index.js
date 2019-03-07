import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'

export default class CardSection extends Component {
  render() {
    return (
      <View style={[ styles.containerStyle, this.props.style ]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    padding: 10,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
})

