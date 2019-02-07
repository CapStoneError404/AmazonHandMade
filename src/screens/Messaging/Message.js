import React, { Component } from 'react';
import { Modal, View, Image, Text, StyleSheet } from 'react-native';
import { ProfilePicture, Wallpaper } from '../../components';
import { GiftedChat } from 'react-native-gifted-chat';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';


class Message extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('artisan'),
      headerRight: (
         <Button 
         icon={<Icon name='images' size={25} color='gray' />}
         type="clear"
         onPress={navigation.getParam('pickImage')}
         />
      )
    };
  };

  componentDidMount() {
   this.props.navigation.setParams({ pickImage: this.pickImage })
}

  constructor(props) {
    super(props);
    
    this.state = {
      messages: [ ...this.props.messages ].reverse(),
      profilePicturePath: ''
    };
    this.pickImage = this.pickImage.bind(this);
    this.addImage = this.addImage.bind(this);
  }

  pickImage() {
   ImagePicker.openPicker({
     width: 100,
     height: 100,
     cropping: true
   }).then(image => {
     this.setState({profilePicturePath: image.path})
     this.addImage();
   });
 }
 
 addImage() {
   const message = {};
   message._id = 100;
   message.createdAt = Date.now();
   message.user = {
     _id: this.props.messages[0].user._id,
     name: `${this.props.messages[0].user.name} `,
   };
   message.image = this.state.profilePicturePath;
   this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, message)
    }));
      
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
