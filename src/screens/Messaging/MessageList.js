import React, { Component } from 'react';
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { ProfilePicture } from '../../components';

export default class MessageList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddMessage: false,
      fetchingMessages: false
    };
  }

  render() {
    return (
      <Wallpaper>
        {this.props.Messages != [] && this.state.fetchingMessages ? (
          <ActivityIndicator
            size="large"
            animating={this.props.spinning}
            color="white"
          />
        ) : (
          <FlatList
            testID="artisan_list"
            data={this.sortedArtisans()}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderArtisanItem}
          />
        )}
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
  MessageView: {
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
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
});
