import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ProfilePicture } from '../../components';
import MessageData from './MessageData.json';

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fetchingMessages: false,
      messages: []
    };
  }

  componentDidMount() {
    //this is where we will update state with the json data 
    //Set fetchingMessage to true
    this.setState({ messages: MessageData, fetchingMessages: true });

  }

  navigateToMessage(message) {
    //Here we are going to navigate to message page
    console.log("We are trying to navigate to message: " +  message);
  }

  _renderMessageItem = ({ item }) => {
   return (
     <TouchableOpacity 
       style={styles.ArtisanView}
       onPress={() => this.navigateToArtisan(item)}
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
        {( this.state.messages != [] && this.state.fetchingMessages ) ? (
          <ActivityIndicator
            size="large"
            animating={this.props.spinning}
            color="white"
          />
        ) : (
          <FlatList
            data={this.state.messages}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderMessageItem}
          />
        )}
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
  MessageView: {
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
