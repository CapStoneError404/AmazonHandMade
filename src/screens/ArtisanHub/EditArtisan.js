import { AddImage, AsyncButton, UserInput, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

class EditArtisan extends Component {
  static navigationOptions = () => {
    return {
      title: 'Edit Artisan'
    }
    
  }

  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      phoneNumber: this.props.phoneNumber,
      location: this.props.location,
      profilePicturePath: "",
      description: this.props.description,
      adding: false
    }

    this.pickImage = this.pickImage.bind(this)
    this.saveArtisan = this.saveArtisan.bind(this)
    this.verifyFields = this.verifyFields.bind(this)
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
    else if(!this.state.location)
      this.props.displayError("Location required")
    else if(!this.state.description)
      this.props.displayError("Please provide a brief description")
    
      
    return this.state.name && this.state.phoneNumber && this.state.location && this.state.description// && this.state.profilePicturePath
  }
  
  saveArtisan() {
    if(this.verifyFields()) {
      this.setState({adding: true})
      this.props.saveArtisan({
        uid: this.props.uid, 
        name: this.state.name,
        phoneNumber: this.state.phoneNumber,
        location: this.state.location,
        profilePicturePath: this.state.profilePicturePath,
        description: this.state.description
      }).then(() => {
        this.setState({adding: false})
        this.props.navigation.state.params.onNavigateBack()
        this.props.navigation.goBack()
      })
    }
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
              onChangeText={(newText) => this.setState({phoneNumber: newText})}
              style={styles.smallInput2}
              keyboardType="number-pad"
            />
          </View>
        </View>
        <View style={styles.secondSection}>
          <UserInput
              iconName="map"
              placeholder="Location"
              value={this.state.location}
              onChangeText={(newText) => this.setState({location: newText})}
              style={styles.smallInput3}
          />
          <UserInput 
            placeholder="Describe this artisan"
            value={this.state.description}
            onChangeText={(newText) => this.setState({description: newText})}
            style={styles.largeInputs}
            multiline={true}
          />
        </View>
        <AsyncButton 
          title="Save"
          color="#c14700"
          textColor="white"
          onPress={() => this.saveArtisan()}
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
  smallInput3: {
    marginTop: 2,
    marginBottom: 0,
    marginRight: 0,
    borderRadius: 5,
    maxHeight: 50
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

export default withMappedNavigationProps()(EditArtisan)