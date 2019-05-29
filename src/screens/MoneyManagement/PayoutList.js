import React, { Component } from 'react'
import {
  Wallpaper,
  ProfilePicture
} from '@components'
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'
import I18n, {setLocale} from "../../utils/i18n"

class PayoutList extends Component {
   static navigationOptions = ({navigation}) => {
     return {
       title: navigation.getParam('Title', 'Payout List')
     }
   }

   constructor(props) {
     super(props)

     this.state = {}
     
     this.props.navigation.setParams({Title: I18n.t("PayoutList.title", {locale: this.props.Settings.language})})

     this.navigateToArtisanPayout = this.navigateToArtisanPayout.bind(this)
     this.getPayoutsTotalForArtisan = this.getPayoutsTotalForArtisan.bind(this)
     this.getProductsRevenueTotalForArtisan = this.getProductsRevenueTotalForArtisan.bind(this)
   }

   navigateToArtisanPayout(item) {
     console.log(item)
     this.props.navigation.navigate('ArtisanPayout', {
       onNavigateBack: this.handleOnNavigateBack,
       ...item
     })
   }

   getLastPayoutDate(artisanUID) {
      var payouts = this.props.payouts.filter(payout => {
        return payout.artisanId === artisanUID
      })
  
      payouts.sort((first, second) => {
        return second.date - first.date
      })

      console.log(payouts)

      if(payouts.length > 0)
        return payouts[payouts.length - 1].date
      else
        return null
   }

   getPayoutsTotalForArtisan(artisanUID) {
     artisanPayouts = this.props.payouts.filter(payout => {
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

     artisanProducts = this.props.products.filter(product => 
       artisanProductIds.includes(product.productID))

     var totalAmount = 0.0
     artisanProducts.forEach(product => {
       totalAmount += (parseInt(product.TimesSold) * parseFloat(product.StandardPrice))
     })

     return totalAmount
   }
   
   _renderPayoutListItem = ({item, index}) => {
     productsRevenueTotal = this.getProductsRevenueTotalForArtisan(item.uid)
     payoutsTotal = this.getPayoutsTotalForArtisan(item.uid)
     payoutDate = this.getLastPayoutDate(item.uid)
     payoutDateString = payoutDate ? new Date(payoutDate).toDateString() : "Never"

     return (
       <TouchableOpacity
         testID={`listItem${index}`}
         style={styles.artisanView}
         onPress={() => this.navigateToArtisanPayout(item)}
         key={item.key}
       >
         <ProfilePicture
           source={{uri: item.profilePictureURL}}
           style={styles.image}
         />
            
         <View style={styles.namePhone}>
           <Text style={styles.text}>{item.name}</Text>
           <Text style={styles.text}>{`${I18n.t("PayoutList.lastPay", {locale: this.props.Settings.language})}: ${payoutDateString}`}</Text>
           <Text style={styles.text}>{`${I18n.t("PayoutList.owed", {locale: this.props.Settings.language})}: $${(productsRevenueTotal - payoutsTotal).toFixed(2)}`}</Text>
           <Text style={styles.text}>{`${I18n.t("PayoutList.paid", {locale: this.props.Settings.language})}: $${payoutsTotal.toFixed(2)}`}</Text>
         </View>
       </TouchableOpacity>
     )
   }

   _keyExtractor = (item) => item.uid

   sortedArtisans() {
     if(this.props.Artisans != []) {
       sortedArtisans = Array.from(this.props.Artisans)
       sortedArtisans.sort((first, second) => {
         name1 = first.name.toLowerCase()
         name2 = second.name.toLowerCase()
         if (name1 < name2)
           return -1
         else if(name1 > name2)
           return 1
         else
           return 0
       })
       return sortedArtisans
     } else {
       return []
     }
   }

   render() {
     return (
       <Wallpaper>
         {(this.props.Artisans != [] && this.state.fetchingPayoutsList) ? 
           <ActivityIndicator 
             size='large'
             animating={this.props.spinning}
             color='white'
           />
           :
           <FlatList
             testID='payouts_list'
             data={this.sortedArtisans()}
             keyExtractor={this._keyExtractor}
             renderItem={this._renderPayoutListItem}
             extraData={this.state}
           />
         }
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
    height: 90,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    margin: 5
  },
  artisanView: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
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

export default withMappedNavigationParams()(PayoutList)


