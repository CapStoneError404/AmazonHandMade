import React, { Component } from 'react';
import { ProfilePicture, Wallpaper } from '@components';
import { View, Text , Image, ScrollView, StyleSheet } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';


class ProductDetail extends Component {
   static navigationOptions =({ navigation }) => {
      title: 'Product Detail'
    }
    constructor(props) {
      super(props)
    }

   render() {
      return (
        <Wallpaper style={styles.container}>
          <ScrollView style={{ flex: 1.8 }}>
            <View style={styles.firstSection}>
              <ProfilePicture 
                source={{uri: this.props.mainPictureURL}}
                style={styles.image}
              />
              <View style={{flex: 1, flexDirection: 'column'}}>
                <Text style={styles.text}>Title:</Text>
                <Text style={styles.text}>{this.props.Title}</Text>
                <Text style={styles.text}>Category:</Text>
                <Text style={styles.text}>{this.props.MainCategory}</Text>
              </View>
            </View>
            <View style={styles.description}>
              <Text style={styles.text}>{this.props.Description}</Text>
            </View>
          </ScrollView>
        </Wallpaper> 
      );
   }
}

const styles = StyleSheet.create({
   container: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      flex: 1
    },
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

export default withMappedNavigationProps()(ProductDetail)

