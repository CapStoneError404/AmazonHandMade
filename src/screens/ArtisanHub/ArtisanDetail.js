import { ProfilePicture, Wallpaper, AsyncButton} from '@components';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert } from 'react-native';
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

    this.onCancel = this.onCancel.bind(this);
    this.deletePressed = this.deletePressed.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

   onCancel() {
      this.setState({ adding: false });
   }

   deletePressed() {
      this.setState({ adding: true });
      this.props.deleteArtisan(this.props.Artisans, this.props.uid)
      .then(() => {
        this.setState({ adding: false })
        this.props.navigation.navigate("ArtisanList")
      });
   }

   showAlert() {
      Alert.alert(
         'Are you sure want delete Artisan?',
         'Delete Artisan',
         [
           {
              text: 'Cancel',
              onPress: () => this.onCancel(),
              style: 'cancel',
           },
          {text: 'OK', onPress: () => this.deletePressed()},
         ],
         {cancelable: false},
      );
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
            <AsyncButton
              title="Delete Artisan"
              color="red"
              textColor="white"
              onPress={this.showAlert}
              style={styles.buttonStyle}
              spinning={this.state.adding}
            />
          </View>
          <View>
            <AsyncButton
              title="Add Product"
              color="green"
              textColor="white"
              onPress={()=>{this.props.navigation.navigate('AddProduct')}}
              style={styles.buttonStyle}
              spinning={this.state.adding}
            />
          </View>
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