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
   }

   render() {
     console.log('YOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO' + JSON.stringify(this.props))

     return (
       <Wallpaper style={styles.container}>
         <ScrollView style={{ flex: 1.8 }}>
           <StandardCard
             title="Welcome To HANDMADE"
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
             title="About This CGA"
             buttonsArray={this.transactionButtons}
           >
             <CardSection  style={styles.cardSection}>
              <Text style={styles.cardText}>Number of Artisans: </Text>
              <Text style={styles.cardText}>Gross Artisan Revenue: </Text>
              <Text style={styles.cardText}>Total Number of Artisan Listings: </Text>
              <Text style={styles.cardText}>Total Number of Items Sold: </Text>
             </CardSection>
           </StandardCard>

           <StandardCard
             title="Resources"
           >
             <CardSection style={styles.cardSection}>
              <Text style={styles.cardText}>Seller Central: </Text>
              <Text style={styles.cardText}>Seller Forums: </Text>
              <Text style={styles.cardText}>Contact Support: </Text>
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
  }
})