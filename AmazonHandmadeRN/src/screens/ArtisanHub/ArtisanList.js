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
    this.navigateToArtisan = this.navigateToArtisan.bind(this)
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

  navigateToArtisan(artisan) {
    console.log("Worked")
    this.props.navigation.navigate('ArtisanDetail', {...artisan})
  }

  _renderArtisanItem = ({item}) => (
    <TouchableOpacity 
      style={styles.artisanView}
      onPress={() => this.navigateToArtisan(item)}
      key={item.key}
    >
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
    if(this.props.Artisans) {
      artisans = Array.from(this.props.Artisans)
      artisans.sort((first, second) => {
        name1 = first.name.toLowerCase()
        name2 = second.name.toLowerCase()
        if (name1 < name2)
          return -1
        else if(name1 > name2)
         return 1
        else
          return 0
      })
      return artisans
    } else {
      return []
    }
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
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
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