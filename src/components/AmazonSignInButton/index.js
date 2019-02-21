import PropTypes from 'prop-types'
import React, { Component } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AmazonSignInButton extends Component {
  render() {
    if(this.props.spinning) {
      return (
        <TouchableOpacity
          style={styles.touchable}
          onPress={this.props.onPress}>
          <LinearGradient 
            colors={['#FEE9AC', '#F5C543']}
            style={styles.buttonWrapper}>
            <ActivityIndicator 
              size='small'
              animating={this.props.spinning}
              color='white'
            />
          </LinearGradient>
        </TouchableOpacity>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.touchable}
          onPress={this.props.onPress}>
          <LinearGradient 
            colors={['#FEE9AC', '#F5C543']}
            style={styles.buttonWrapper}>
            <Icon name='amazon' style={styles.icon} />
            <Text style={styles.text}>
              Login with Amazon
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      )
    }
  }
}

AmazonSignInButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  spinning: PropTypes.bool
}

const styles = StyleSheet.create({
  touchable: {
    flex: 1,
    marginTop: 5,
    marginBottom: 5
  },
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#A9831F'
  },
  icon: {
    fontSize: 30,
    fontFamily: 'System',
    color: 'black',
    marginRight: 5,
    left: -5
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black'
  }
})