import React, { Component } from 'react';
import { Modal, View, Image, Text, Button, StyleSheet } from 'react-native';
import { ProfilePicture, Wallpaper } from '../../components';
import { GiftedChat } from 'react-native-gifted-chat';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

class Message extends Component {
  constructor(props) {
    super(props);
    console.log("What is thsi here:" + this.props);
    this.state = {
      messages: []
    };
  }

  componentDidMount() {
     this.setState({ messages: this.props.messages.reverse() })

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

export default withMappedNavigationProps()(Message)
