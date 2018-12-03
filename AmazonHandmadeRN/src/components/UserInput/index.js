import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import { StyleSheet, View, TextInput, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class UserInput extends Component {
  render() {
    return (
      <View style={[styles.inputWrapper, this.props.style]}>
        {(this.props.iconName) ?
          <Icon name={this.props.iconName} style={styles.icon} /> : null}
        <TextInput
          style={styles.input}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
          autoCapitalize="none"
          autoCorrect={this.props.autoCorrect}
          secureTextEntry={this.props.secureTextEntry}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  iconName: PropTypes.string,
  onChangeText: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  autoCorrect: PropTypes.bool,
  secureTextEntry: PropTypes.bool,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.85)',
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
  input: {
    flex: 1,
    fontSize: 20
  }
});