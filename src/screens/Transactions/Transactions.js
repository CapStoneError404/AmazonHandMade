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
         title: 'Transaction Management'
      }

   }

   constructor(props) {
      super(props)
      this.state = {
         paidAmount: null,
         amountOwed: null
      }

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

   componentDidMount() {
      this.props.getAlreadyPaid()
      this.props.getPaymentOwed()
      this.setState({
         amountOwed: this.props.Transactions.amountOwed,
         paidAmount: this.props.Transactions.paidAmount
      })
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
                     <Text style={styles.cardText}>{`Total Owed: $${Math.floor(Math.random() * 10000 + 1)}.${Math.floor(Math.random() * 98 + 1)}`}</Text>
                     <Text style={styles.cardText}>{`Total Payouts: $${Math.floor(Math.random() * 10000 + 1)}.${Math.floor(Math.random() * 98 + 1)}`}</Text>
                  </CardSection>
               </StandardCard>

               <StandardCard
                  title="Transactions"
                  buttonsArray={this.transactionButtons}
               >
                  <CardSection  style={styles.cardSection}>
                    <Text style={styles.cardText}>{`Items Sold: ${Math.floor(Math.random() * 100 + 1)}`}</Text>
                    <Text style={styles.cardText}>{`Gross Product Revenue: $${Math.floor(Math.random() * 50000 + 1)}.${Math.floor(Math.random() * 98 + 1)}`}</Text>
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