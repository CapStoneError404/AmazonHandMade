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

    console.log("Yep")
    console.log(props)

    var messages = []
    if(this.props.messages != []) {
      messages = Object.keys(this.props.messages).map(key => {
        return {
          _id: key,
          text: this.props.messages[key].content,
          createdAt: this.props.messages[key].timeCreated,
          user: {
            _id: this.props.messages[key].author,
            name: "Ian Battin"
          }
        }
      })
    }
    
    this.state = {
      messages: messages
    };
  }

  onSend(messages = []) {
    this.props.sendMessage(this.props.User.uid, messages[0].text, {
      "-LY5sXBRKkiRLom8giUR": "18056804033"
    })
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
              _id: this.props.User.uid
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
