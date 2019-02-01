import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProfilePicture , Wallpaper} from '../../components';
import  MessageData from './MessageData.json';

export default class MessageList extends Component {
  static navigationOptions = ({navigation, tintColor}) => {
    var iconName = 'edit';
    return {
      title: 'Messages',
      headerRight: (
        <Button 
          icon={<Icon name={iconName} size={25} color={tintColor} />}
          type="clear"
        />
      )
    }
  }

  constructor(props) {
    super(props)
  }
  

  navigateToMessage(message) {
    console.log("message: " + message);
    //Here we are going to navigate to message page
    this.props.navigation.navigate('Message', { ...message });
  }

  _renderMessageItem = ({ item }) => {
   return (
     <TouchableOpacity 
       style={styles.ArtisanView}
       onPress={() => this.navigateToMessage(item)}
       key={item.key}
     >
       <ProfilePicture
          source={{uri: item.profilePictureURL}}
          style={styles.image}
       />
       <View style={styles.namePhone}>
          <Text style={styles.text}>{item.artisan}</Text>
       </View>
     </TouchableOpacity>
    );
   }

   _keyExtractor = (item) => item.id

  render() {
    return (
      <Wallpaper>
          <FlatList
            data={MessageData}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderMessageItem}
          />
      </Wallpaper>
    );
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
  ArtisanView: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
});
