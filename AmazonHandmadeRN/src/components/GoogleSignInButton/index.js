import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Dimensions from 'Dimensions';
import {StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

export default class GoogleSignInButton extends Component {
   render() {
     return (
       <TouchableOpacity 
         style={styles.buttonWrapper} 
         onPress={this.props.onPress}>
            <Image source={require('../../../assets/images/GoogleGLogo.png')} style={styles.icon}/>
            <Text style={styles.text}>
               Google
            </Text>
       </TouchableOpacity>
   );
   }
 }
 
 GoogleSignInButton.propTypes = {
   onPress: PropTypes.func.isRequired
 };

const styles = StyleSheet.create({
  buttonWrapper: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255,255,255,1)',
      borderRadius: 30,
      marginTop: 5,
      marginBottom: 10
  },
  icon: {
     width: 20,
     height: 20,
     marginRight: 5,
     left: -5
  },
  text: {
      fontSize: 15,
      fontWeight: 'bold',
      color: 'gray'
  }
});