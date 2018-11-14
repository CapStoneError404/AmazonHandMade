import React, { Component } from 'react';
import {
   Platform,
   StyleSheet,
   Text,
   View,
   KeyboardAvoidingView,
   TouchableOpacity,
   ScrollView
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient'
import { Button } from '@components'

export default class Error extends Component {
   constructor(props) {
      super(props)

      this.logout = this.logout.bind(this)
   }

   logout() {
      this.props.authLogout()
   }

   render() {
      return (
         <LinearGradient colors={['#f12711', '#f5af19']} style={styles.container}>
            <View style={styles.textContainer}>
               <ScrollView>
                  <Text style={styles.text}>{"Error!\n\n" + this.props.Errs.join("\n\n")}</Text>
               </ScrollView>
            </View>
            <Button
               style={styles.button}
               title="Return to Login"
               color="#c14700"
               textColor="white"
               onPress={this.props.clearErrors}
            />
         </LinearGradient>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 20
   },
   textContainer: {
      flex: 8,
      marginTop: 10,
      marginBottom: 30,
      justifyContent: 'flex-start',
      alignItems: 'center',
   },
   text: {
      fontSize: 20
   },
   button: {
      flex: 1
   }
})