import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AsyncButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={[styles.buttonWrapper, this.props.style, {backgroundColor: (this.props.color) ? this.props.color : 'black'}]}
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

AsyncButton.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  color: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  title: PropTypes.string,
  textColor: PropTypes.string,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'black',
    paddingHorizontal: 20,
    borderRadius: 30,
    marginTop: 5,
    marginBottom: 5
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