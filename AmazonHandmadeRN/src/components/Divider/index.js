import React, {Component} from 'react';
import {StyleSheet, View } from 'react-native';

export default class Divider extends Component {
   render() {
     return (
       <View style={styles.divider} />
   );
   }
 }

const styles = StyleSheet.create({
  divider: {
     flex: 1,
     borderBottomColor: '#444444',
     borderBottomWidth: 1,
     margin: 10
  }
});