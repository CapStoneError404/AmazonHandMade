import { Wallpaper } from '@components';
import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default class ProductList extends Component {
  static navigationOptions = ({navigation}) => {
    return { 
      title: 'Product',
      headerRight: (
        <Button
          transparent
          onPress={() => console.log("Add Product Pressed")}
          title="Add"
        />
      )
    }
  }
  
  constructor(props) {
    super(props) 

    this.state = { 
      showProductList: false,
      ProductListData: [
        {id: 0, productName: "chocolate"}
        {id: 1, productName: "sombrero"}
      ],  
      fetchingProductList: false
    }
  }

  _renderProductListItem = ({item, index}) => {
      return (
        <TouchableOpacity
          testID={`listItem${index}`}
          style={styles.productListView}
          onPress={() => console.log("pressed item")}
          key={item.key}
        >
          {/* <ProfilePicture
            source={{uri: item.profilePictureURL}}
            style={styles.image}
          /> */}
          <View style={styles.namePhone}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text}>{item.phoneNumber}</Text>
          </View>
        </TouchableOpacity>
      )
  }

  _keyExtractor = (item, index) => item.uid

  sortedProducts() { 
    if(this.props.Products != []) {
      sortedProducts = Array.from(this.props.Artisans)
      sortedProducts.sort((first, second) => {
        name1 = first.name.toLowerCase()
        name2 = second.name.toLowerCase()
        if (name1 < name2)
          return -1
        else if(name1 > name2)
          return 1
        else
          return 0
      })
      return sortedProducts
    } else {
      return []
    }
  }

  render() {
    return (
      <Wallpaper>
        <FlatList
          testID='product_list'
          data={this.sortedProducts()}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderProductListItem}
        />
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
  productListView: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  namePhone: {
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  }
})