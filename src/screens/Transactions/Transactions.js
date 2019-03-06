import React, { Component } from 'react'
import {
   Wallpaper,
   AsyncButton,
   CardSection,
   StandardCard
} from '@components'
import {
   ScrollView,
   StyleSheet,
   Text,
   View
} from 'react-native'

export default class Transactions extends Component {

   static navigationOptions = () => {
      return {
         title: 'Transactions'
      }

   }
   constructor(props) {
      super(props)
      this.stat = {}

      this.transactionButtons = [
         {
            title: 'View All',
            onPress: () => console.log("View All")
         },
         {
            title: 'Stats',
            onPress: () => console.log("Message Artisan")
         }
      ]

      this.navigateToPayoutList = this.navigateToPayoutList.bind(this)

   }

   navigateToPayoutList() {
      const { } = this.props
      navigation.navigate('PayoutList', {
         currentUID: uid,
         onNavigateBack: this.handleOnNavigateBack,
         previousScreen: 'Transactions'
      })
   }

   render() {
      return (
         <Wallpaper style={styles.container}>
            <AsyncButton
               title="PayoutList"
               color="#c14700"
               textColor="white"
               onPress={() =>
                  this.props.navigation.navigate('PayoutList')
               }
               style={styles.button}
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