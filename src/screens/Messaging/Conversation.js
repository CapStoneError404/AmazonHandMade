import React, { Component } from 'react'
import { Wallpaper } from '../../components'
import { GiftedChat } from 'react-native-gifted-chat'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome5'
import ImagePicker from 'react-native-image-crop-picker'
import firebase from 'react-native-firebase'

class Conversation extends Component {
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
    }
  };

  constructor(props) {
    super(props)

    console.log(props)
    
    this.state = {
      messages: [],
      url: ''
    }

    this.pickImage = this.pickImage.bind(this)
    this.addImage = this.addImage.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ pickImage: this.pickImage })

    firebase.database().ref(`conversations/${this.props.uid}/messages`).on('child_added', snapshot => {
      let message = {
        uid: snapshot.key,
        ...snapshot.val()
      }

      console.log(message)

      this.setState(previousState => ({
        messages: GiftedChat.append(previousState.messages, this.formatMessages([message]))
      }))
    })
  }

  formatMessages(messages) {
    let formattedMessages = []
    for(var m in messages) {
      let author = messages[m].author.includes('amazon') ? 
        this.props.User 
        : 
        this.props.Artisans.filter(
          artisan => artisan.uid === messages[m].author)[0]
      
      let formattedMessage = {
        _id: messages[m].uid,
        text: messages[m].contents,
        createdAt: messages[m].timeCreated,
        user: {
          _id: author.uid,
          name: author.name,
          avatar: author.profilePictureURL
        }
      }

      formattedMessages.push(formattedMessage)
    }

    return formattedMessages
  }

  pickImage() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true
    }).then(image => {
      this.setState({url: image.path})
      this.addImage()
    })
  }
 
  addImage() {
    let message = {
      _id: Math.round(Math.random() * 1000000),
      text: '',
      createdAt: new Date(),
      user: {
        _id: this.props.messages[0].user._id
      },
      image: this.state.url
    }
    this.onSend(message) 
  }

  onSend(messages) {
    let recipients = this.props.participants.filter(
      p => p !== this.props.User.uid
    ).reduce((map, obj) => {
      console.log(obj)
      map[obj] = this.props.Artisans.filter(
        artisan => artisan.uid === obj)[0].phoneNumber
      return map
    }, {})

    console.log(recipients)

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages)
    }))

    this.props.sendMessage(this.props.User.uid, messages[0].text, recipients).then(() => {
      this.setState({
        messages: this.formatMessages(
          this.props.Conversations.filter(cnv => cnv.uid === this.props.uid)[0]
            .messages)
          .reverse()
      })
    })
  }
  
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
    )
  }
}

export default withMappedNavigationProps()(Conversation)
