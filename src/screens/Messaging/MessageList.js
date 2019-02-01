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
import { ProfilePicture , Wallpaper} from '../../components';
import  MessageData from './MessageData.json';

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
    // let data = JSON.parse(MessageData);
    // console.log("Trying to output data: " + data);
    // //this.setState({ messages: MessageData, fetchingMessages: true });
    // console.log(this.state.messages);
    console.log("Printing out Message data to screen");
    console.log(MessageData);
    this.setState({ messages: [ ...this.state.messages ,...MessageData ], fetchingMessages: true});
    const someStuff = [ ...MessageData ];
    console.log(`some stuff ${someStuff}`);
    console.log("printout out state messages: " + this.state.messages);

  }

  navigateToMessage(message) {
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
