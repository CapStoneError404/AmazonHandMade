import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList,
  Modal
} from 'react-native';

import {
  AsyncButton,
  UserInput,
  Divider,
  Wallpaper,
  Logo
} from '@components'

import { AddArtisan } from '@screens/ArtisanHub'

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
      artisans: [],
      showAddArtisan: false
    }

    this.addArtisan = this.addArtisan.bind(this)
  }

  componentWillMount() {
    this.props.navigation.setParams({
      addArtisan: this.addArtisan
    })
  }

  addArtisan() {
    this.setState({showAddArtisan: true})
  }

  _renderArtisanItem = ({item}) => (
    <View>
      <Text>{item.name}</Text>
    </View>
  )

  render() {
    return (
      <Wallpaper>
        <FlatList 
          data={this.state.artisans}
          renderItem={({item}) => (
            <ArtisanListItem />
          )}
        />
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  list: {

  }
})