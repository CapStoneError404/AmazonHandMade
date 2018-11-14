import React, { Component } from 'react'
import {
   View, Text, StyleSheet
} from 'react-native'
import { Wallpaper } from '@components'

export default class ForgotPassword extends Component {
   constructor(props) {
      super(props)
   }

   render() {
      return (
         <Wallpaper>
            <Text style={styles.logo}>Handmade</Text>
         </Wallpaper>
      )
   }
}

const styles = StyleSheet.create({
   logo: {
      flex: 3,
      textAlign: 'center',
      fontSize: 60,
      color: 'white',
      marginTop: 60
   }
})