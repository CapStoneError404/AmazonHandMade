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

class ArtisanPayout extends Component {
   static navigationOptions = () => {
      return {
         title: 'Artisan Payout'
      }

   }

   constructor(props) {
      super(props)

      this.artisanPayoutButtons = [
         {
            title: 'View All',
            onPress: () => this.navigateToPayoutList()
         },
         {
            title: 'Stats',
            onPress: () => console.log("Message Artisan")
         }
      ]
      this.state = {}
   }

   render() {
      return (
         <Wallpaper style={styles.container}>
            <ScrollView style={{ flex: 1.8 }}>
               <StandardCard
                  title="Artisan Payout"
                  buttonsArray={this.artisanPayoutButtons}
               >
                  <CardSection>
                     <Text>Some Text</Text>
                  </CardSection>
               </StandardCard>
               <AsyncButton
                  title="Log Payout"
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
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '2%'
   },
   image: {
      borderRadius: 5
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

export default withMappedNavigationProps()(ArtisanPayout)