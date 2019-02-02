import { ProfilePicture, Wallpaper, Button, Confirm} from '@components';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

class ArtisanDetail extends Component {
  static navigationOptions = {
    title: "Artisan Details"
  }

  constructor(props) {
    super(props)

    this.state = {
       showModel: false,
       adding: false
    }

    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
  }

   onAccept() {
      this.setState({ adding: true })
      this.props.deleteArtisan(this.props.uid)
      .then(() => {
        this.setState({ adding: false })
        this.props.navigation.navigate("ArtisanList")
      });
   }

   onDecline() {
      this.setState({ showModel: false });
   }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView>
          <View style={styles.firstSection}>
            <ProfilePicture 
              source={{uri: this.props.profilePictureURL}}
              style={styles.image}
            />
            <View style={styles.namePhone}>
              <Text style={styles.text}>{this.props.name}</Text>
              <Text style={styles.text}>{this.props.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.text}>{this.props.description}</Text>
          </View>
          <View>
            <Button 
              color="red"
              textColor="white"
              onPress={() => this.setState({ showModel: !this.state.showModel })}
              title="Delete Artisan"
              style={styles.buttonStyle}
            />
          </View>
          <Confirm 
            visible={this.state.showModel}
            onAccept={this.onAccept}
            onDecline={this.onDecline}
            spinning={this.state.adding}

          >
            Are you sure you want to delete this Artisan?
          </Confirm>
        </ScrollView>
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
  firstSection: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  description: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  },
  buttonStyle: {
     marginLeft:10,
     marginRight: 10
  }
})

export default withMappedNavigationProps()(ArtisanDetail)