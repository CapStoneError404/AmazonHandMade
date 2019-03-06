import { Button, Wallpaper } from '@components'
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

export default class Transactions extends Component {
   constructor(props) {
      super(props)

   }

   render() {
      return (
         <Wallpaper>
            <View style={styles.textContainer}>
               <ScrollView>
                  <Text style={styles.text}>{"Money"}</Text>
               </ScrollView>
            </View>
            <Button
               testID='money_button'
               style={styles.button}
               title="Artisan Payouts"
               color="#c14700"
               textColor="white"
               onPress={console.log("money button pressed!")}
            />
         </Wallpaper>
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