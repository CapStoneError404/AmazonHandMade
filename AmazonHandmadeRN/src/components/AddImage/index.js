import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class AddImage extends Component {
  render() {
    return (
      <TouchableOpacity 
        style={[styles.default, styles.addImage, this.props.style]}
        onPress={this.props.onPress}
      >
        {(this.props.imageUri) ? 
          <Image
            style={[styles.default, this.props.style]}
            source={{uri: this.props.imageUri}}
          />
          :
          <View style={[styles.default, styles.addImage]}>
            <Text style={styles.text}>Add Image</Text>
            <Icon
              name="plus"
              size={20}
              color="darkgrey"
            />
          </View>
        }
      </TouchableOpacity>
    );
  }
}

AddImage.propTypes = {
  style: PropTypes.object,
  imageUri: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  default: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  addImage: {
    backgroundColor: '#DDDDDD'
  },
  text: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: 'darkgrey'
  }
});