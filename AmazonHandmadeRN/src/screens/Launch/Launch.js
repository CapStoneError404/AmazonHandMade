import React, { Component } from 'react'
import {
   View,
   ActivityIndicator,
   StyleSheet
} from 'react-native'

import LinearGradient from 'react-native-linear-gradient'
import firebase from 'react-native-firebase'

export default class Launch extends Component {
   constructor(props) {
      super(props)

      console.log("PROPS")
      console.log(this.props)
   }

   componentDidMount() {
      this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
         if(user)
            this.props.navigation.navigate("Home")
         else
            this.props.navigation.navigate("Login")
      });
   }

   componentWillUnmount() {
      if (this.unsubscriber) {
         this.unsubscriber();
      }
   }

   render() {
      return(
         <LinearGradient colors={['#f12711', '#f5af19']} style={styles.container}>
         </LinearGradient>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
   }
})