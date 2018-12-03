import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class ProfilePicture extends Component {
  render() {
    return (
      (this.props.source.uri) ? 
        <Image 
          source={this.props.source}
          style={[styles.image, this.props.style]}
        />
        :
        <View style={[styles.noImage, this.props.style]}>
          <Icon name="user" size={50} color="darkgrey"/>
        </View>
    )
  }
}

ProfilePicture.propTypes = {
  style: PropTypes.object,
  source: PropTypes.object
};

const styles = StyleSheet.create({
  image: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  noImage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'lightgrey'
  }
});


