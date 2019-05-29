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
  ActivityIndicator,
  RefreshControl
} from 'react-native'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'
import I18n, {setLocale} from "../../utils/i18n"

class MoneyManagement extends Component {
   static navigationOptions = ({navigation}) => {
     return {
       title: navigation.getParam('Title', 'Money Management')
     }

   }

   constructor(props) {
     super(props)
     this.state = {
       payouts: [],
       products: [],
       paidAmount: 0,
       amountOwed: 0,
       productsSold: 0,
       productsRevenue: 0,
       fetching: false
     }

     this.payoutButtons = [
       {
         title: I18n.t("MoneyManagement.viewAll", {locale: this.props.Settings.language}),
         onPress: () => this.navigateToPayoutList()
       }
     ]
     
     this.props.navigation.setParams({Title: I18n.t("MoneyManagement.title", {locale: this.props.Settings.language})})

     this.updateNumbers = this.updateNumbers.bind(this)
     this.fetchPayoutsAndTransactions = this.fetchPayoutsAndTransactions.bind(this)
     this.navigateToPayoutList = this.navigateToPayoutList.bind(this)
   }

   componentDidMount() {
     this.updateNumbers()
   }

   updateNumbers() {
    this.fetchPayoutsAndTransactions().then(() => {
      payoutsTotal = this.state.payouts.reduce((total, current) => {
        return total + current.amount
      }, 0)

      productsTotal = this.state.products.reduce((total, current) => {
        return total + (current.TimesSold * current.StandardPrice)
      }, 0)

      numProductsSold = this.state.products.reduce((total, current) => {
        return total + current.TimesSold
      }, 0)

      this.setState({
        fetching: false,
        paidAmount: payoutsTotal,
        amountOwed: productsTotal - payoutsTotal,
        productsRevenue: productsTotal,
        productsSold: numProductsSold
      })
    })
   }

   async fetchPayoutsAndTransactions() {
     this.setState({fetching: true})

     var promises = []

     let artisans = await this.props.fetchArtisans(this.props.User.uid)
     let payouts = await this.props.fetchPayouts(this.props.User.uid)
     var allProducts = []
     artisans.forEach(artisan => {
       let productPromise = this.props.fetchProducts(artisan.uid).then(products => {
         allProducts = allProducts.concat(products)
       })
       promises.push(productPromise)
     })

     return Promise.all(promises).then(() => {
       this.setState({
         payouts: payouts,
         products: allProducts
       })
     })
   }

   navigateToPayoutList() {
     this.props.navigation.navigate('PayoutList', {
       ...this.props,
       products: [].concat(this.state.products), 
       payouts: [].concat(this.state.payouts)
    })
   }

   render() {
     return (
       <Wallpaper style={styles.container}>
         {this.state.fetching ?
          <ActivityIndicator 
            size='large'
            animating={this.props.spinning}
            color='white'
          />
          :
         <ScrollView  
           style={{ flex: 1.8 }}
           refreshControl={
            <RefreshControl
              refreshing={this.state.fetching}
              onRefresh={this.updateNumbers}
            />
          }
         >
           <StandardCard
             title={I18n.t("MoneyManagement.payouts", {locale: this.props.Settings.language})}
             buttonsArray={this.payoutButtons}
           >
             <CardSection style={styles.cardSection}>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.moneyOwed", {locale: this.props.Settings.language})}: ${this.state.amountOwed.toFixed(2)}</Text>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.totalPayments", {locale: this.props.Settings.language})}: ${this.state.paidAmount.toFixed(2)}</Text>
             </CardSection>
           </StandardCard>

           <StandardCard
             title={I18n.t("MoneyManagement.transactions", {locale: this.props.Settings.language})}
             buttonsArray={this.transactionButtons}
           >
             <CardSection  style={styles.cardSection}>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.numberSold", {locale: this.props.Settings.language})}: {this.state.productsSold}</Text>
               <Text style={styles.cardText}>{I18n.t("MoneyManagement.income", {locale: this.props.Settings.language})}: ${this.state.productsRevenue.toFixed(2)}</Text>
             </CardSection>
           </StandardCard>
         </ScrollView>
         }
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

export default withMappedNavigationParams()(MoneyManagement)