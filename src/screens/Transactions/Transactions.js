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
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

export default class Transactions extends Component {

   static navigationOptions = () => {
     return {
       title: 'Transactions'
     }

   }
   constructor(props) {
     super(props)
     this.stat = {}

     this.transactionButtons = [
       {
         title: 'View All',
         onPress: () => this.navigateToPayoutList()
       },
       {
         title: 'Stats',
         onPress: () => console.log("Message Artisan")
       }
     ]

     this.navigateToPayoutList = this.navigateToPayoutList.bind(this)

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
             title="Transactions"
             buttonsArray={this.transactionButtons}
           >
             <CardSection>
               <Text>Some Text</Text>
             </CardSection>
           </StandardCard>
           <AsyncButton
             title="Payout List"
             color="green"
             textColor="white"
             onPress={() =>
               this.props.navigation.navigate('PayoutList')
             }
             style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
           />
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
  text: {
    fontSize: 20
  },
  button: {
    flex: 1
  }
})