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
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

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
            onPress: () => console.log("Nav to Transactions for artisans")
         },
         {
            title: 'Stats',
            onPress: () => console.log("Clicked on Transaction Stats")
         }
      ]

      this.payoutButtons = [
         {
            title: 'View All',
            onPress: () => this.props.navigation.navigate('PayoutList')
         },
         {
            title: 'Stats',
            onPress: () => console.log("Clicked on Payout Stats")
         }
      ]

      this.navigateToPayoutList = this.navigateToPayoutList.bind(this)

   }

   navigateToPayoutList() {
      const { } = this.props
      navigation.navigate('PayoutList')
   }

   render() {
      return (
         <Wallpaper style={styles.container}>
            <ScrollView style={{ flex: 1.8 }}>
               <StandardCard
                  title="Payouts"
                  buttonsArray={this.payoutButtons}
               >
                  <CardSection style={styles.cardSection}>
                     <Text style={styles.cardText}>Money Owed: </Text>
                     <Text style={styles.cardText}>Total payments: </Text>
                  </CardSection>
               </StandardCard>

               <StandardCard
                  title="Transactions"
                  buttonsArray={this.transactionButtons}
               >
                  <CardSection  style={styles.cardSection}>
                    <Text style={styles.cardText}>Number items sold: </Text>
                    <Text style={styles.cardText}>Overall Product Income: </Text>
                  </CardSection>
               </StandardCard>
            </ScrollView>
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
   cardSection: {
      flex: 1, 
      flexDirection: 'column' 
   },
   text: {
      fontSize: 20
   },
   cardText: {
      paddingVertical: 10,
      flex: 1,
      fontSize: 20,
      color: '#444444'
   }
})