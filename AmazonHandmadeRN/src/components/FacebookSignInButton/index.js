import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export default class FacebookSignInButton extends Component {
   render() {
     return (
       <TouchableOpacity 
         style={styles.buttonWrapper}
         onPress={this.props.onPress}>
            <Icon name='facebook' style={styles.icon} />
            <Text style={styles.text}>
               Facebook
            </Text>
       </TouchableOpacity>
      );
   }
 }
 
 FacebookSignInButton.propTypes = {
   onPress: PropTypes.func.isRequired
 };

const styles = StyleSheet.create({
  buttonWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#3b5998',
      borderRadius: 30,
      marginTop: 5,
      marginBottom: 10
  },
  icon: {
     fontSize: 20,
     fontFamily: 'System',
     color: 'white',
     marginRight: 5,
     left: -5
  },
  text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'white'
  }
});