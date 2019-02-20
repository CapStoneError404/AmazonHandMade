import { ProfilePicture, Wallpaper } from '@components';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import MessageData from '../Messaging/MessageData.json';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Button } from 'react-native-elements';

class ArtisanDetail extends Component {
  static navigationOptions = ({navigation}) => {
    const uid = navigation.getParam('uid');
    return {
      title: 'Artisan Details',
      headerRight: (
        <Button 
          onPress={() => {
            const foundArtisan = MessageData.find((message) => message.id === uid);
            return (foundArtisan !== undefined) ? navigation.navigate('Message', { ...foundArtisan }) :
              navigation.navigate('Messages')
         }}
         icon={<Icon name={'comment'} size={30} color='gray' />}
         type="clear"
        />
       )
     }
   }

  constructor(props) {
    super(props)

    this.findArtisan = this.findArtisan.bind(this);

  }

  findArtisan() {
    console.log("artisan id: " + this.props.uid);
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView>
          <View style={styles.firstSection}>
            <ProfilePicture 
              source={{uri: this.props.profilePictureURL}}
              style={styles.image}
            />
            <View style={styles.namePhone}>
              <Text style={styles.text}>{this.props.name}</Text>
              <Text style={styles.text}>{this.props.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.text}>{this.props.description}</Text>
          </View>
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
  firstSection: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  description: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
})

export default withMappedNavigationProps()(ArtisanDetail)