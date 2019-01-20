import { Button, ProfilePicture, Wallpaper } from '@components';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default class CGAHome extends Component {
  constructor(props) {
    super(props)

    this.addProduct = this.addProduct.bind(this)
  }

  addProduct() {
    console.log("navigate to add product")
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        {/* <ScrollView> */}
          <View style={styles.CGAHeadSection}>
            <ProfilePicture 
                source={{uri: this.props.User.photoURL}}
                style={styles.image}
            />
            <View style = {{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.CGATitleText}>Welcome</Text>
              <Text style={styles.CGATitleText}>{this.props.User.displayName? this.props.User.displayName: this.props.User.email}</Text>
            </View>
          </View>
          
          <View style={styles.actionCenterSection}>
            <Text style={styles.text}>Action Center</Text>
          </View>

          <View style={styles.buttonSection}>
            <Button
              style={styles.button}
              title="Add Product"
              color="#c14700"
              textColor="white"
              onPress={this.addProduct}
            />
          </View>
       {/* </ScrollView> */}
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  CGAHeadSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  buttonSection: {
    flexGrow: 1,
    paddingHorizontal: 50
  },
  actionCenterSection: {
    flexGrow: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  image: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0,
    margin: 5
  },
  CGATitleText: {
    alignSelf: 'center',
    fontSize: 20,
    alignItems: 'center',
    color: 'white',
  },
  text: {
    alignSelf: 'center',
    fontSize: 20,
    color: 'black',
    alignItems: 'center',
    textDecorationLine: 'underline'
  },
  button: {

  }
})