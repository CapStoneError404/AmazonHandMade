import React, { Component } from 'react'
import {
  Wallpaper,
  AsyncButton,
  CardSection,
  StandardCard,
  ProfilePicture
} from '@components'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

class PayoutList extends Component {
   static navigationOptions = () => {
     return {
       title: 'PayoutList'
     }

   }

   constructor(props) {
     super(props)

     this.state = {}
     this.navigateToArtisanPayout = this.navigateToArtisanPayout.bind(this)
     this.getPayoutsTotalForArtisan = this.getPayoutsTotalForArtisan.bind(this)
     this.getProductsRevenueTotalForArtisan = this.getProductsRevenueTotalForArtisan.bind(this)
   }

   navigateToArtisanPayout(item) {
     const { } = this.props
     console.log(item)
     this.props.navigation.navigate('ArtisanPayout', {
       onNavigateBack: this.handleOnNavigateBack,
       ...item
     })
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
   
   _renderPayoutListItem = ({item, index}) => {
     productsRevenueTotal = this.getProductsRevenueTotalForArtisan(item.uid)
     payoutsTotal = this.getPayoutsTotalForArtisan(item.uid)

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
           <Text style={styles.text}>{`Last Payout: ${Math.floor(Math.random() * 11 + 1)}/${Math.floor(Math.random() * 27 + 1)}/19`}</Text>
           <Text style={styles.text}>{`Owed: $${productsRevenueTotal - payoutsTotal}`}</Text>
           <Text style={styles.text}>{`Paid: $${payoutsTotal}`}</Text>
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


