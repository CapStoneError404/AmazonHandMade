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
import I18n, {setLocale} from "../../utils/i18n"

export default class MoneyManagement extends Component {
   static navigationOptions = ({navigation}) => {
     return {
       title: navigation.getParam('Title', 'Money Management')
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
         title: I18n.t("MoneyManagement.viewAll", {locale: this.props.Settings.language}),
         onPress: () => console.log("Nav to Transactions for artisans")
       },
       {
         title: I18n.t("MoneyManagement.stats", {locale: this.props.Settings.language}),
         onPress: () => console.log("Clicked on Transaction Stats")
       }
     ]

     this.payoutButtons = [
       {
         title: I18n.t("MoneyManagement.viewAll", {locale: this.props.Settings.language}),
         onPress: () => this.props.navigation.navigate('PayoutList')
       },
       {
         title: I18n.t("MoneyManagement.stats", {locale: this.props.Settings.language}),
         onPress: () => console.log("Clicked on Payout Stats")
       }
     ]
     
     this.props.navigation.setParams({Title: I18n.t("MoneyManagement.title", {locale: this.props.Settings.language})})

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
             title={I18n.t("MoneyManagement.payouts", {locale: this.props.Settings.language})}
             buttonsArray={this.payoutButtons}
           >
             <CardSection style={styles.cardSection}>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.moneyOwed", {locale: this.props.Settings.language})}: {this.state.amountOwed}</Text>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.totalPayments", {locale: this.props.Settings.language})}: {this.state.paidAmount}</Text>
             </CardSection>
           </StandardCard>

           <StandardCard
             title={I18n.t("MoneyManagement.transactions", {locale: this.props.Settings.language})}
             buttonsArray={this.transactionButtons}
           >
             <CardSection  style={styles.cardSection}>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.numberSold", {locale: this.props.Settings.language})}: </Text>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.income", {locale: this.props.Settings.language})}: </Text>
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