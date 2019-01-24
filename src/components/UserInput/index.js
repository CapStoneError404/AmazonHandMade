import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class UserInput extends Component {
  render() {
    return (
      <View style={(this.props.multiline) ? 
        [styles.multiLineInputWrapper, this.props.style] : 
        [styles.singleLineInputWrapper, this.props.style]}
      >
        {(this.props.iconName) ?
          <Icon name={this.props.iconName} style={styles.icon} /> : null}
        <TextInput
          {...this.props}
          style={[styles.input, this.props.style]}
        />
      </View>
    );
  }
}

UserInput.propTypes = {
  iconName: PropTypes.string,
  style: PropTypes.object
};

const styles = StyleSheet.create({
  singleLineInputWrapper: {
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
  multiLineInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 10,
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