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
             title="Welcome CGA"
           >
             <CardSection style={styles.cardSection}>
             </CardSection>
           </StandardCard>

           <StandardCard
             title="CGA Information"
             buttonsArray={this.transactionButtons}
           >
             <CardSection  style={styles.cardSection}>
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