import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';
import { ProfilePicture, Wallpaper } from '../../components';
import { GiftedChat } from 'react-native-gifted-chat';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

class Message extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('artisan')
    };
  };


  constructor(props) {
    super(props);
    console.log("Got inside constructor");
    this.state = {
      messages: [ ...this.props.messages ].reverse()
    };
  }



  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
    
  }

  render() {
      return (
        <Wallpaper>
           <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.props.messages[0].user._id
            }}
            
           />
        </Wallpaper>
      );
    
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
});

export default withMappedNavigationProps()(Message)
