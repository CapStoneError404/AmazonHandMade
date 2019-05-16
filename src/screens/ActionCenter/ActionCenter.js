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
  Linking,
  TouchableOpacity
} from 'react-native'
import { ProfilePicture } from '../../components'

export default class ActionCenter extends Component {
   static navigationOptions = () => {
     return {
       title: 'Action Center'
     }

   }

   constructor(props) {
     super(props)
     this.state = {
       
     }
     this.settingsNavButton=[
     {
       title: 'Edit',
       onPress: () => this.navigateToEditCGA()
     },
     {
       title: 'Settings',
       onPress: () => this.navigateToSettings()
     }
    ]
    this.navigateToEditCGA = this.navigateToEditCGA.bind(this)
    this.navigateToSettings = this.navigateToSettings.bind(this)
    this.getTotalListings = this.getTotalListings.bind(this)
   }
   
   
   getTotalListings() {
      var numArtisans = this.props.Artisans.length
      var totalListings = 0

      for(var i = 0; i < numArtisans; i++) {
        totalListings += Object.keys((this.props.Artisans[i]["products"]) || {}).length
      }
      return totalListings
   }

   navigateToEditCGA() {
    //todo
   }

   navigateToSettings() {
    this.props.navigation.navigate("Settings")
   }

   render() {
      return (
       <Wallpaper style={styles.container}>
         <ScrollView style={{ flex: 1.8 }}>
           <StandardCard
             title="Welcome To HANDMADE"
             buttonsArray={this.settingsNavButton}
           >
             <CardSection style={styles.cardSection}>
              <ProfilePicture
               source={{uri: this.props.User.photoURL}}
               style={styles.image}
              />
              <Text style={styles.cardText}>Name: {this.props.User.displayName} </Text>
              <Text style={styles.cardText}>Email: {this.props.User.email}</Text>
             </CardSection>
           </StandardCard>

           <StandardCard
             title="About Artisans"
             buttonsArray={this.transactionButtons}
           >
             <CardSection  style={styles.cardSection}>
              <Text style={styles.cardText}>Number of Artisans: {this.props.Artisans.length}</Text>
              <Text style={styles.cardText}>Total Artisan Listings: {this.getTotalListings()}</Text>
             </CardSection>
           </StandardCard>

           <StandardCard
             title="Resources"
           >
             <CardSection style={styles.cardSection}>
              <TouchableOpacity onPress={()=>Linking.openURL('https://error404.gitbook.io/project/')}>
                <Text style={[styles.cardText, styles.linkText]}>Application Documentation </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>Linking.openURL('https://sellercentral.amazon.com/')}>
                <Text style={[styles.cardText, styles.linkText]}>Seller Central</Text>
              </TouchableOpacity> 
              <TouchableOpacity onPress={()=>Linking.openURL('https://sellercentral.amazon.com/forums/')}>
                <Text style={[styles.cardText, styles.linkText]}>Seller Forums </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>Linking.openURL('https://www.amazon.com/ap/signin?openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fhz%2Fcontact-us%3Ffrom%3Dgp%26*entries*%3D0%26_encoding%3DUTF8%26*Version*%3D1&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_contactus_desktop_us&openid.mode=checkid_setup&marketPlaceId=ATVPDKIKX0DER&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=Amazon&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.pape.max_auth_age=3600&siteState=clientContext%3D133-3534273-1927417%2CsourceUrl%3Dhttps%253A%252F%252Fwww.amazon.com%252Fhz%252Fcontact-us%253Ffrom%253Dgp%2526*entries*%253D0%2526_encoding%253DUTF8%2526*Version*%253D1%2Csignature%3DroWGPjqxWUoNNtMkFrBDZBSTH0Yj3D')}>
                <Text style={[styles.cardText, styles.linkText]}>Contact Support </Text>
              </TouchableOpacity>
             </CardSection>
           </StandardCard>
         </ScrollView>
       </Wallpaper>
     )
   }
}

const styles = StyleSheet.create({
  image: {
    height: 90,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    margin: 5
  },
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
    fontSize: 10,
    color: '#444444',
    marginLeft: 5
  },
  cardText: {
    paddingVertical: 10,
    flex: 1,
    fontSize: 20,
    color: '#444444'
  },
  linkText: {
    color:'#008296'
  }
})