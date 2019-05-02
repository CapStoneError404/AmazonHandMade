import { AddImage, AsyncButton, UserInput, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { isValidPhoneNumber } from 'react-phone-number-input'

export default class AddArtisan extends Component {
  static navigationOptions = {
    title: 'Add Artisan'
  }

  constructor(props) {
    super(props)

    this.state = {
      name: "",
      phoneNumber: "",
      location: "",
      profilePicturePath: "",
      description: "",
      adding: false,

      focusedInputs: { name: false, phoneNumber: false, location: false, description: false }
    }

    this.pickImage = this.pickImage.bind(this)
    this.createArtisan = this.createArtisan.bind(this)
    this.verifyFields = this.verifyFields.bind(this)
    this.onTextChange = this.onTextChange.bind(this)
    this.displayErrorMessage = this.displayErrorMessage.bind(this)
  }

  pickImage() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true
    }).then(image => {
      this.setState({ profilePicturePath: image.path })
    })
  }

  displayErrorMessage(errorMessage) {
    this.props.displayError(errorMessage)
    return false
  }

  verifyFields() {
    let validFields = true
    if (!this.state.name)
      validFields = this.displayErrorMessage("Name field required.")

    if (this.state.name) {
      if (!this.state.name.match(/[a-zA-Z]/)) {
        console.log(this.state.name)
        validFields = this.displayErrorMessage("Only alphabetic characters allowed for name.")
      }
    }

    if (!this.state.phoneNumber)
      validFields = this.displayErrorMessage("Phone field required")

    if (this.state.phoneNumber && !isValidPhoneNumber(this.state.phoneNumber))
      validFields = this.displayErrorMessage("Phone number not valid")

    if (!this.state.location)
      validFields = this.displayErrorMessage("Location required")

    if (!this.state.description)
      validFields = this.displayErrorMessage("Please provide a brief description")

    if (!this.state.profilePicturePath)
      validFields = this.displayErrorMessage("Please upload a profile picture")

    return validFields

  }

  createArtisan() {
    if (this.verifyFields()) {
      this.setState({ adding: true })

      let artisanInfo = {
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        location: this.state.location,
        description: this.state.description
      }

      this.props.createArtisan(artisanInfo, this.props.User.uid, this.state.profilePicturePath).then(artisan => {
        return this.props.sendMessage(
          this.props.User.uid,
          `Hello ${artisanInfo.name}, welcome to our organization! Please respond "YES" to verify you would like to be added to our community.`,
          { [artisan.uid]: artisanInfo.phoneNumber }
        )
      }).then(() => {
        this.setState({ adding: false })
        this.props.navigation.goBack()
      }, error => {
        console.log(error)
      })
    }
  }

  onTextChange(text) {
    var cleaned = ('' + text).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : ''),
        number = [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')

      this.setState({
        phoneNumber: number
      })

      return
    }

    this.setState({
      phoneNumber: text
    })
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
            <View style={this.state.focusedInputs.name ? [styles.focusedInput, styles.inputWrapper] : styles.inputWrapper}>
              <UserInput
                iconName="id-card"
                placeholder="Name"
                value={this.state.name}
                onChangeText={(newText) => this.setState({ name: newText })}
                onFocus={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, name: true } })}
                onBlur={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, name: false } })}
                style={styles.smallInput1}
              />
            </View>
            <View style={this.state.focusedInputs.phoneNumber ? [styles.focusedInput, styles.inputWrapper] : styles.inputWrapper}>
              <UserInput
                iconName="phone"
                placeholder="Phone Number"
                value={this.state.phoneNumber}
                onChangeText={this.onTextChange}
                onFocus={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, phoneNumber: true } })}
                onBlur={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, phoneNumber: false } })}
                style={styles.smallInput2}
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>
        <View style={styles.secondSection}>
          <View style={this.state.focusedInputs.location ? [styles.focusedInput2, styles.inputWrapper2] : styles.inputWrapper2}>
            <UserInput
              iconName="map"
              placeholder="Location"
              value={this.state.location}
              onChangeText={(newText) => this.setState({ location: newText })}
              onFocus={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, location: true } })}
              onBlur={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, location: false } })}
              style={styles.smallInput3}
            />
          </View>
          <View style={this.state.focusedInputs.description ? [styles.focusedInput2, styles.inputWrapper3] : styles.inputWrapper3}>
            <UserInput
              placeholder="Describe this artisan"
              value={this.state.description}
              onChangeText={(newText) => this.setState({ description: newText })}
              onFocus={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, description: true } })}
              onBlur={() => this.setState({ focusedInputs: { ...this.state.focusedInputs, description: false } })}
              style={styles.largeInputs}
              multiline={true}
            />
          </View>
        </View>
        <AsyncButton
          title="Create"
          color='#c14700'
          textColor='white'
          onPress={this.createArtisan}
          style={styles.button}
          spinning={this.state.adding}
          disabled={false}
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
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 5
  },
  smallInput2: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 5
  },
  smallInput3: {
    marginTop: 0,
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 5
  },
  largeInputs: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    flex: 1,
    flexDirection: 'column'
  },
  focusedInput: {
    borderWidth: 2,
    marginBottom: 2,
    marginLeft: 4,
    borderColor: 'orange',
    borderRadius: 5
  },
  inputWrapper: {
    borderRadius: 5,
    marginBottom: 2,
    marginLeft: 4,
    backgroundColor: 'rgba(255,255,255,0.85)',
    flex: 1,
  },
  focusedInput2: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 5
  },
  inputWrapper2: {
    marginTop: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    flex: 1
  },
  inputWrapper3: {
    marginTop: 4,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.5)',
    flex: 3
  }
})