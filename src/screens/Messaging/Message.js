import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';
import { ProfilePicture } from '../../components';
import { GiftedChat } from 'react-native-gifted-chat';

export default class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [
        {
          _id: 1,
          text: 'Hello developer',
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'React Native',
            avatar: 'https://placeimg.com/140/140/any'
          }
        }
      ]
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  rendor() {
    <GiftedChat
      messages={this.state.messages}
      onSend={messages => this.onSend(messages)}
      user={{
        _id: 1
      }}
    />;
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
});
