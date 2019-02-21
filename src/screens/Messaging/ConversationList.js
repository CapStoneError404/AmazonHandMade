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
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


export default class ConversationList extends Component {
  static navigationOptions = ({ navigation }) => {
    var iconName = 'edit';
    return {
      title: 'Messages',
      headerRight: (
         <Button 
           icon={<Icon name={iconName} size={25} color='gray' />}
           type="clear"
           onPress={navigation.getParam('chatButton')}
         />
      ),
      headerLeft: (
         <Button 
           title='Cancel' 
           onPress={navigation.getParam('cancelChat')}
           type='clear'
         />
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
       groupChat: false,
       radioTracker: [],
       fetchingConversations: false
    }

    this.chatButton = this.chatButton.bind(this);
    this.cancelChat = this.cancelChat.bind(this);
    this.radioButtonSelected = this.radioButtonSelected.bind(this);
    this.fetchConversations = this.fetchConversations.bind(this)
    this.navigateToConversation = this.navigateToConversation.bind(this)
    this.sortedConversations = this.sortedConversations.bind(this)
  }

  componentDidMount() {
    this.props.navigation.setParams({ chatButton: this.chatButton, cancelChat: this.cancelChat })
    this.fetchConversations()
  }

  fetchConversations() {
    this.setState({fetchingConversations: true})
    this.props.fetchConversations(this.props.User.uid).then(() => {
      this.setState({fetchingConversations: false})
    })
  }

  navigateToConversation(conversation) {
    this.props.navigation.navigate('Conversation', { ...conversation });
  }

  chatButton = () => {
    console.log('chat button pressed');
    this.setState({ groupChat: true });
  }

  cancelChat = () => {
    this.setState({ groupChat: false, radioTracker: []});
  }

  radioButtonSelected(radioObj) {
    const tracker = this.state.radioTracker.slice();
    tracker[radioObj.value].isSelected = !tracker[radioObj.value].isSelected;
    this.setState({ radioTracker: tracker });
  }
  
  _renderConversationItem = ({ item, index }) => {
    if(this.state.groupChat === true) {
      let obj = {label: `${item.id}`, value: index, isSelected: false }
      this.state.radioTracker.push(obj)
      return (
        <View style={styles.artisanView} key={item.key}>
          <RadioButton labelHorizontal={true} >
          <RadioButtonInput
            obj={obj}
            index={index}
            isSelected={this.state.radioTracker[obj.value].isSelected}
            onPress={() => this.radioButtonSelected(obj)}  
          />
          </RadioButton>
          <ProfilePicture
            source={{uri: item.profilePictureURL}}
            style={styles.image}
          />
          <View style={styles.text}>
            <Text style={styles.name}>{item.artisan}</Text> 
            <Text numberOfLines={2} style={styles.lastMessage}>{item.messages.slice(-1)[0].text}</Text>
          </View>
        </View>
      );
    } else {
      let artisan = this.props.Artisans.filter(artisan => {
        return artisan.uid === item.participants.filter(id => id !== this.props.User.uid)[0]
      })[0]

      return (
        <TouchableOpacity 
          style={styles.artisanView}
          onPress={() => this.navigateToConversation(item)}
          key={item.key}
        >
          <ProfilePicture
            source={{uri: artisan.profilePictureURL}}
            style={styles.image}
          />
          <View style={styles.text}>
            <Text style={styles.name}>{artisan.name}</Text> 
            <Text numberOfLines={2} style={styles.lastMessage}>{item.messages.slice(-1)[0].contents}</Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

  _keyExtractor = (item) => item.uid;

  sortedConversations() {
    if(this.props.Conversations != []) {
      return Array.from(this.props.Conversations)
    } else {
      return []
    }
  }

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
          data={this.sortedConversations()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderConversationItem}
          extraData={this.state}
        />
        }
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


