import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';
import { ProfilePicture, Wallpaper } from '../../components';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: this.props.messages
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
            messages={this.props.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1
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
