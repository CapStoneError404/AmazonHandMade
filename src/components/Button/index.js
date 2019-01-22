import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Button extends Component {
  render() {
    return (
      <TouchableOpacity
        testID={this.props.testID}
        style={[styles.buttonWrapper, { backgroundColor: (this.props.color) ? this.props.color : 'white' }]}
        onPress={this.props.onPress}>
        {(this.props.iconName) ?
          <Icon name={this.props.iconName} style={styles.icon} color={(this.props.iconColor) ? this.props.iconColor : styles.icon.color} /> : null}
        <Text style={[styles.text, { color: (this.props.textColor) ? this.props.textColor : 'black' }]}>
          {this.props.title}
        </Text>
      </TouchableOpacity>
    );
  }
}

Button.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  color: PropTypes.string,
  textColor: PropTypes.string,
  testID: PropTypes.string
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'rgba(255,255,255,1)',
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 10
  },
  icon: {
    fontSize: 20,
    color: '#444444',
    marginRight: 5,
    left: -5
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});