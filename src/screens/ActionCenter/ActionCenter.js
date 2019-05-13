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
     return (
       <Wallpaper style={styles.container}>
         <ScrollView style={{ flex: 1.8 }}>
           <StandardCard
             title="Welcome To HANDMADE"
           >
             <CardSection style={styles.cardSection}>
              <Text style={styles.cardText}>Name:  </Text>
              <Text style={styles.cardText}>Location: </Text>
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