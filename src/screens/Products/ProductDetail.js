import React, { Component } from 'react';
import {
  Button,
  ProfilePicture,
  Wallpaper,
  Card,
  CardSection
} from '@components';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  FlatList
} from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import { Icon, List } from 'react-native-elements';

class ProductDetail extends Component {
  static navigationOptions = {
    title: 'Product Detail'
  };

  constructor(props) {
    super(props);
    this.state = {
      showModel: false,
      drawerOpen: false,
      editExpanded: true,
      statsExpanded: true
    };
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <Card>
            <CardSection
              style={{
                backgroundColor: 'rgb(71, 77, 84)',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.headerText}>{this.props.Title}</Text>
              <Icon
                name="dots-vertical"
                size={30}
                color="orange"
                type="material-community"
                underlayColor={'rgb(71, 77, 84)'}
                onPress={() =>
                  this.setState({ editExpanded: !this.state.editExpanded })
                }
              />
            </CardSection>
            <CardSection>
              <ProfilePicture
                source={{ uri: this.props.mainPictureURL }}
                style={styles.image}
              />
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
          <Card>
            <CardSection
              style={{
                backgroundColor: 'rgb(71, 77, 84)',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.headerText}>{this.props.MainCategory}</Text>
            </CardSection>
            <CardSection
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.descriptionStyle}>
                {this.props.Description}
              </Text>
            </CardSection>
          </Card>
          <Card>
            <CardSection
              style={{
                backgroundColor: 'rgb(71, 77, 84)',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.headerText}>Info</Text>
            </CardSection>
            <CardSection
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>Sub-Cat</Text>
              <Text style={styles.SectionListItemS}>
                {this.props.SubCategory}
              </Text>
            </CardSection>
            <CardSection
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>Price</Text>
              <Text style={styles.SectionListItemS}>
                {'$' + this.props.StandardPrice}
              </Text>
            </CardSection>
            <CardSection
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>In Stock</Text>
              <Text style={styles.SectionListItemS}>{this.props.Quantity}</Text>
            </CardSection>
            <CardSection
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>Gender</Text>
              <Text style={styles.SectionListItemS}>{this.props.Gender}</Text>
            </CardSection>
            <CardSection
              style={{
                backgroundColor: 'white',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>Number of Sales</Text>
              <Text style={styles.SectionListItemS}>
                {this.props.TimesSold}
              </Text>
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
    height: 200,
    width: 250,
    borderWidth: 1,

    aspectRatio: 1,
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
    fontSize: 15,
    color: 'black',
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
  ProductInfo: {
    fontSize: 16,
    color: 'black'
  },
  SectionListItemS: {
    fontSize: 16,
    padding: 4,
    color: 'black'
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
