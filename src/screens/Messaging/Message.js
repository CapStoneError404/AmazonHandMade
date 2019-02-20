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
    
    this.state = {
      messages: [ ...this.props.messages ].reverse()
    };
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }));
  }

  //this.props.messages[0].user._id will be changed with the person ID who is currently Logged in and needs to be unique
  render() {
      return (
        <Wallpaper>
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: this.props.messages[0].user._id
            }}
            placeholder="Type a message..."
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
