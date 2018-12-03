import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TouchableOpacity,
  FlatList
} from 'react-native';

import {
  AsyncButton,
  UserInput,
  Divider,
  Wallpaper,
  ProfilePicture
} from '@components'

export default class AddArtisan extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: "",
      phoneNumber: ""
    }
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <View style={styles.firstSection}>
          <ProfilePicture />
          <View style={styles.namePhone}>
            <UserInput
              iconName="id-card"
              placeholder="Name"
              value={this.state.name}
              onChangeText={(newText) => this.setState({name: newText})}
              style={styles.smallInputs}
            />
            <UserInput
              iconName="phone"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChangeText={(newText) => this.setState({phoneNumber: newText})}
              style={styles.smallInputs}
            />
          </View>
        </View>
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  container: {

  },
  firstSection: {
    width: '100%',
    height: 100,
    flexDirection: 'row'
  },
  namePhone: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  smallInputs: {
    marginTop: 1,
    marginBottom: 0,
    marginLeft: 1,
    marginRight: 1,
    borderRadius: 5
  }
})