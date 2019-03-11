import { AddImage, AsyncButton, UserInput, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'

export default class AddArtisan extends Component {
  static navigationOptions = {
    title: 'Add Artisan'
  }

  constructor(props) {
    super(props)

    this.state = {
      name: "",
      phoneNumber: "",
      profilePicturePath: "",
      description: "",
      adding: false
    }

    this.pickImage = this.pickImage.bind(this)
    this.createArtisan = this.createArtisan.bind(this)
    this.verifyFields = this.verifyFields.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
  }

  pickImage() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true
    }).then(image => {
      this.setState({profilePicturePath: image.path})
    })
  }

  verifyFields() {
    if(!this.state.name)
      this.props.displayError("Name field required.")
    else if(!this.state.phoneNumber)
      this.props.displayError("Phone field required")
    else if(!this.state.description)
      this.props.displayError("Please provide a brief description")
    //else if(!this.state.profilePicturePath)
    //  this.props.displayError("Please upload a profile picture")

    return this.state.name && this.state.phoneNumber && this.state.description// && this.state.profilePicturePath
  }
  
  createArtisan() {
    if(this.verifyFields()) {
      this.setState({adding: true})

      let artisanInfo = {
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        description: this.state.description
      }

      this.props.createArtisan(artisanInfo, this.props.User.uid, this.state.profilePicturePath).then(artisan => {
        return this.props.sendMessage(
          this.props.User.uid, 
          `Hello ${artisanInfo.name}, welcome to our organization! Please respond "YES" to verify you would like to be added to our community.`,
          {[artisan.uid]: artisanInfo.phoneNumber}
        )
      }).then(() => {
        this.setState({adding: false})
        this.props.navigation.goBack()
      })
    }
  }

  onTextChange(text) {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : ''),
            number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('');

        this.setState({
          phoneNumber: number
        });

        return;
    }

    this.setState({
      phoneNumber: text
    });
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <View style={styles.firstSection}>
          <AddImage 
            imageUri={this.state.profilePicturePath}
            onPress={() => this.pickImage()}
            style={styles.image}
          />
          <View style={styles.namePhone}>
            <UserInput
              iconName="id-card"
              placeholder="Name"
              value={this.state.name}
              onChangeText={(newText) => this.setState({name: newText})}
              style={styles.smallInput1}
            />
            <UserInput
              iconName="phone"
              placeholder="Phone Number"
              value={this.state.phoneNumber}
              onChangeText={this.onTextChange}
              style={styles.smallInput2}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.secondSection}>
          <UserInput 
            placeholder="Describe this artisan"
            value={this.state.description}
            onChangeText={(newText) => this.setState({description: newText})}
            style={styles.largeInputs}
            multiline={true}
          />
        </View>
        <AsyncButton 
          title="Create"
          color="#c14700"
          textColor="white"
          onPress={this.createArtisan}
          style={styles.button}
          spinning={this.state.adding}
        />
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: '2%'
  },
  image: {
    borderRadius: 5
  },
  firstSection: {
    width: '100%',
    height: 100,
    flexDirection: 'row'
  },
  secondSection: {
    width: '100%',
    flexDirection: 'column',
    flex: 4
  },
  namePhone: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  smallInput1: {
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 4,
    marginRight: 0,
    borderRadius: 5
  },
  smallInput2: {
    marginTop: 2,
    marginBottom: 0,
    marginLeft: 4,
    marginRight: 0,
    borderRadius: 5
  },
  largeInputs: {
    marginTop: 4,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
  },
  button: {
    borderRadius: 5, 
    flex: 1, 
    flexDirection: 'column'
  }
})