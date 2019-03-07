import { Wallpaper, AsyncButton, CardSection, StandardCard } from '@components'
import React, { Component } from 'react'
import { ActivityIndicator, Button, FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProfilePicture } from '../../components'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

class PayoutList extends Component {
   static navigationOptions = () => {
      return {
         title: 'PayoutList'
      }
   }

   constructor(props) {
      super(props)

      /* this.payoutListButtons = [
         {
            title: 'button',
            onPress: () => console.log("button pressed")
         },
         {
            title: 'button',
            onPress: () => console.log("button pressed")
         }
      ] */

      this.state = {
         showPayoutList: false,
         fetchingArtisans: false
      }

      this.fetchArtisans = this.fetchArtisans.bind(this)
      this.navigateToArtisanPayout = this.navigateToArtisanPayout.bind(this)
   }

   componentDidMount() {
      this.fetchArtisans()
   }

    fetchArtisans() {
      this.setState({fetchingArtisans: true})
      this.props.fetchArtisans(this.props.User.uid).then(() => {
        this.setState({fetchingArtisans: false})
      })
    }

   navigateToArtisanPayout(artisan) {
      const { } = this.props
      this.props.navigation.navigate('ArtisanPayout', {
         onNavigateBack: this.handleOnNavigateBack
      })
   }

   _renderPayouyListItem = ({item, index}) => {
      return (
        <TouchableOpacity
          testID={`listItem${index}`}
          style={styles.artisanView}
          onPress={() => this.props.navigation.navigateToArtisanPayout(artisan)}
          key={item.key}
        >
          <ProfilePicture
            source={{uri: item.profilePictureURL}}
            style={styles.image}
          />
            
          <View style={styles.namePhone}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.phoneNumber}</Text>
            <Text style={styles.text}>{`Quantity: ${item.pho}`}</Text>
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
      
      /* return (
         <Wallpaper style={styles.container}>
            <Wallpaper style={styles.container}>
               <ScrollView style={{ flex: 1.8 }}>
                  <StandardCard
                     title="PayoutList"
                     buttonsArray={this.payoutListButtons}
                  >
                     <CardSection>
                        <Text>Some Text</Text>
                     </CardSection>
                  </StandardCard>
                  <AsyncButton
                     title="Artisan Payout"
                     color="green"
                     textColor="white"
                     onPress={() =>
                        this.props.navigation.navigate('ArtisanPayout')
                     }
                     style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
                  />
               </ScrollView>
            </Wallpaper>
         </Wallpaper>
      )
   } */

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

export default withMappedNavigationProps()(PayoutList)