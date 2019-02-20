import React, { Component } from 'react';
import {
  Button,
  ProfilePicture,
  Wallpaper,
  Card,
  CardSection
} from '@components';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';

class ProductDetail extends Component {
  static navigationOptions = {
    title: 'Product Detail'
  };

  constructor(props) {
    super(props);
    this.state = {
      productMainCategory: '',
      productSubCategory: '',
      productGender: '',
      productMainPicture: '',
      productTitle: 'Widgets',
      productDescription: '',
      productStandardPrice: '',
      productSellerSKU: '',
      productQuantity: '',
      productTime: '',
      images: [
        {
          id: 0,
          productUrl:
            'https://i.pinimg.com/originals/87/2c/83/872c83322f27c9527a255149b03d4dfe.jpg'
        },
        {
          id: 1,
          productUrl:
            'https://images-na.ssl-images-amazon.com/images/I/51jzNmEmiIL._AC_US400_QL65_.jpg'
        },
        {
          id: 2,
          productUrl:
            'https://images-na.ssl-images-amazon.com/images/I/51svf2meabL._AC_US400_QL65_.jpg'
        }
      ]
    };
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <Card>
            <CardSection>
              <Text style={styles.descriptionTitle}>
                {this.state.productTitle}
              </Text>
            </CardSection>
            <CardSection>
              <ProfilePicture
                source={{ uri: this.state.images[0].productUrl }}
                style={styles.image}
              />
            </CardSection>
            <CardSection>
              <Text>Put product Info in this cardSection</Text>
            </CardSection>
            <CardSection style={{ backgroundColor: 'white' }}>
              <Button
                style={{ height: 20, backgroundColor: 'white' }}
                title="Edit"
                textColor="orange"
                onPress={() => console.log('Edit Product')}
              />
              <Button
                style={{ height: 20, backgroundColor: 'white' }}
                title="Stats"
                textColor="orange"
                onPress={() => console.log('Get Stats')}
              />
            </CardSection>
          </Card>
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
    flex: 1,
    //  alignItems: 'center',
    //height: 200,
    //width: 250,
    borderWidth: 1,
    //borderRadius: 75
    // height: 150,
    aspectRatio: 2,
    //  alignItems: 'stretch',
    //alignItems: 'center',
    justifyContent: 'center'
    // borderRadius: 60,
    // margin: 5
    //position: 'absolute',
    //resizeMode: 'cover'
  },
  nameStyle: {
    flex: 1,
    fontSize: 30,
    color: '#444444',
    marginLeft: 5
  },
  phoneStyle: {
    flex: 2,
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  },
  descriptionStyle: {
    fontSize: 30,
    color: '#444444',
    marginLeft: 5,
    flexDirection: 'row'
  },
  descriptionTitle: {
    flexDirection: 'row',
    flex: 1,
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 5
  },
  headerText2: {
    fontSize: 20,
    color: 'rgb(71, 77, 84)',
    marginLeft: 5
  },
  gridView: {
    marginTop: 0,
    flex: 1,
    flexDirection: 'row'
  },
  imageContainer: {
    justifyContent: 'space-evenly',
    borderRadius: 5,
    height: 110,
    width: 110,
    alignSelf: 'center'
  },
  elevationLow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
});
export default withMappedNavigationProps()(ProductDetail);
