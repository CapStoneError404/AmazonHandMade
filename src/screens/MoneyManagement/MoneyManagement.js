import React, { Component } from 'react'
import {
  Wallpaper,
  CardSection,
  StandardCard
} from '@components'
import {
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native'

export default class MoneyManagement extends Component {
   static navigationOptions = () => {
     return {
       title: 'Money Management'
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
     this.getPayoutsTotal = this.getPayoutsTotal.bind(this)
     this.getPayoutsTotalForArtisan = this.getPayoutsTotalForArtisan.bind(this)
     this.getProductsRevenueTotal = this.getProductsRevenueTotal.bind(this)
     this.getProductsRevenueTotalForArtisan = this.getProductsRevenueTotalForArtisan.bind(this)
   }

   componentDidMount() {
     payoutsTotal = this.getPayoutsTotal()
     revenueTotal = this.getProductsRevenueTotal()
     this.setState({
       amountOwed: revenueTotal - payoutsTotal,
       paidAmount: payoutsTotal
     })
   }

   navigateToPayoutList() {
     navigation.navigate('PayoutList')
   }

   getPayoutsTotal() {
     var totalAmount = 0.0
     var artisanIds = this.props.Artisans.map(artisan => artisan.uid)
     artisanIds.forEach(artisanId => {
       totalAmount += this.getPayoutsTotalForArtisan(artisanId)
     })

     return totalAmount
   }

   getProductsRevenueTotal() {
     var totalAmount = 0.0
     var artisanIds = this.props.Artisans.map(artisan => artisan.uid)
     artisanIds.forEach(artisanId => {
       totalAmount += this.getProductsRevenueTotalForArtisan(artisanId)
     })

     return totalAmount
   }

   getPayoutsTotalForArtisan(artisanUID) {
     artisanPayouts = this.props.Payouts.filter(payout => {
       return payout.artisanId == artisanUID
     })

     var totalAmount = 0.0
     artisanPayouts.forEach(payout => {
       totalAmount += payout.amount
     })

     return totalAmount
   }

   getProductsRevenueTotalForArtisan(artisanUID) {
     artisanProductIds = this.props.Artisans.filter(artisan => { 
       return artisan.uid == artisanUID
     })[0].products

     if(!artisanProductIds)
       return 0
     artisanProductIds = Object.keys(artisanProductIds)

     artisanProducts = this.props.Products.filter(product => 
       artisanProductIds.includes(product.productID))

     var totalAmount = 0.0
     artisanProducts.forEach(product => {
       totalAmount += (parseInt(product.TimesSold) * parseFloat(product.StandardPrice))
     })

     return totalAmount
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
               <Text style={styles.cardText}>Money Owed: {this.state.amountOwed}</Text>
               <Text style={styles.cardText}>Total payments: {this.state.paidAmount}</Text>
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
    flex: 1
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