import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  Image
} from 'react-native';

import {
  AsyncButton,
  UserInput,
  Divider,
  Wallpaper,
  Logo
} from '@components'
import { ProfilePicture } from '../../components';

export default class ArtisanList extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: 'Artisans',
      headerRight: (
        <Button 
          transparent
          onPress={() => navigation.navigate("AddArtisan")}
          title="Add"
        />
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showAddArtisan: false,
      fetchingArtisans: false
    }

    this.addArtisan = this.addArtisan.bind(this)
    this.fetchArtisans = this.fetchArtisans.bind(this)
  }

  componentDidMount() {
    this.fetchArtisans()
    this.props.navigation.setParams({
      addArtisan: this.addArtisan
    })
  }

  fetchArtisans() {
    this.setState({fetchingArtisans: true})
    this.props.fetchArtisans().then(() => {
      this.setState({fetchingArtisans: false})
    })
  }

  addArtisan() {
    this.setState({showAddArtisan: true})
  }

  _renderArtisanItem = ({item}) => (
    <TouchableOpacity style={styles.artisanView}>
      <ProfilePicture 
        source={{uri: item.profilePictureURL}}
        style={styles.image}
      />
      <View style={styles.namePhone}>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.phoneNumber}</Text>
      </View>
    </TouchableOpacity>
  )

  _keyExtractor = (item, index) => item.uid

  _getData() {
    artisans = Object.keys(this.props.Artisans).map((key, index) => {
      newObject = this.props.Artisans[key]
      newObject["uid"] = key
      return newObject
    })
    artisans.sort((first, second) => first.name < second.name)
    return artisans
  }

  render() {
    return (
      <Wallpaper>
        {(this.state.fetchingArtisans) ?
        <ActivityIndicator 
          size='large'
          animating={this.props.spinning}
          color='white'
        />
        :
        <FlatList 
          data={this._getData()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderArtisanItem}
        />
        }
      </Wallpaper>
    )
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
    width: '100%',
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 0,
    marginTop: 10
  },
  namePhone: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
})