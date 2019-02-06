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
    this.props.navigation.navigate('Message', { ...message });
  }

  _renderMessageItem = ({ item }) => {
   return (
     <TouchableOpacity 
       style={styles.artisanView}
       onPress={() => this.navigateToMessage(item)}
       key={item.key}
     >
       <ProfilePicture
          source={{uri: item.profilePictureURL}}
          style={styles.image}
       />
       <View style={styles.text}>
          <Text style={styles.name}>{item.artisan}</Text>
          <Text numberOfLines={2} style={styles.lastMessage}>{item.messages.slice(-1)[0].text}</Text>
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
  text: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  name: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  },
  lastMessage: {
    fontSize: 15,
    color: 'lightgray',
    marginLeft: 5,
    marginRight: 5
  }
});
