import React, { Component } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ProfilePicture , Wallpaper} from '../../components';
import  MessageData from './MessageData.json';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default class MessageList extends Component {
  static navigationOptions = ({navigation, tintColor}) => {
    var iconName = 'edit';
    return {
      title: 'Messages',
      headerRight: (
         <Button 
           icon={<Icon name={iconName} size={25} color={tintColor} />}
           type="clear"
           onPress={navigation.getParam('chatButton')}
         />
      )
    }
   }

  constructor(props) {
    super(props)

    this.state = {
       groupChat: false,
       fetchingConversations: false
    }

    this.chatButton = this.chatButton.bind(this);
    this.cancelChat = this.cancelChat.bind(this);
    this.getGroupChat = this.getGroupChat.bind(this);
    this.fetchConversations = this.fetchConversations.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ chatButton: this.chatButton, cancelChat: this.cancelChat, getGroupChat: this.getGroupChat })
    this.fetchConversations()
  }

  fetchConversations() {
    this.setState({fetchingConversations: true})
    this.props.fetchConversations().then(() => {
      this.setState({fetchingConversations: false})
    })
  }

  chatButton = () => {
     console.log('chat button pressed');
     this.setState({ groupChat: true });
  }

  cancelChat = () => {
     console.log("cancel chat");
     this.setState({ groupChat: false });
  }

  getGroupChat = () => {
     return this.state.groupChat;
  }
  
  navigateToMessage(message) {
    this.props.navigation.navigate('Message', { ...message });
  }

  _renderConversationItem = ({item, index}) => {
    const artisan = this.props.Artisans.filter(artisan => {
      return artisan.uid == Object.keys(item.participants)[0]
    })[0]

    return (
      <TouchableOpacity 
        style={styles.artisanView}
        onPress={() => this.navigateToMessage(item)}
        key={item.key}
      >
        <ProfilePicture
          source={{uri: artisan.profilePictureURL}}
          style={styles.image}
        />
        <View style={styles.text}>
          <Text style={styles.name}>{artisan.name}</Text> 
          <Text numberOfLines={2} style={styles.lastMessage}>{Object.values(item.messages).slice(-1)[0].contents}</Text>
        </View>
      </TouchableOpacity>
    );
   }

   _keyExtractor = (item) => item.uid

  render() {
    return (
      <Wallpaper>
        {(this.props.Conversations != [] && this.state.fetchingConversations) ?
        <ActivityIndicator 
          size='large'
          animating={this.props.spinning}
          color='white'
        />
        :
        <FlatList
          data={this.props.Conversations}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderConversationItem}
        />}
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
  artisanView: {
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
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  name: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  },
  lastMessage: {
    fontSize: 15,
    color: 'lightgray',
    marginLeft: 5,
    marginRight: 5
  }
});


