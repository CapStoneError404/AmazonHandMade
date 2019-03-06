import { AsyncButton, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

class LogPayout extends Component {
   static navigationOptions = () => {
      return {
         title: 'Log Payout'
      }

   }

   constructor(props) {
      super(props)

      this.state = {}
   }

   render() {
      return (
         <Wallpaper style={styles.container}>
            <AsyncButton
               title="Button"
               color="#c14700"
               textColor="white"
               onPress={console.log("Log Payout")}
               style={styles.button}
            />
         </Wallpaper>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '2%'
   },
   image: {
      borderRadius: 5
   },
   firstSection: {
      width: '100%',
      height: 100,
      flexDirection: 'row'
   },
   secondSection: {
      width: '100%',
      flexDirection: 'column',
      flex: 4
   },
   namePhone: {
      flex: 1,
      flexDirection: 'column',
      alignItems: 'stretch',
      justifyContent: 'space-evenly',
      width: '100%',
   },
   smallInput1: {
      marginTop: 0,
      marginBottom: 2,
      marginLeft: 4,
      marginRight: 0,
      borderRadius: 5
   },
   smallInput2: {
      marginTop: 2,
      marginBottom: 0,
      marginLeft: 4,
      marginRight: 0,
      borderRadius: 5
   },
   largeInputs: {
      marginTop: 4,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      borderRadius: 5,
   },
   button: {
      borderRadius: 5,
      flex: 1,
      flexDirection: 'column'
   }
})

export default withMappedNavigationProps()(LogPayout)