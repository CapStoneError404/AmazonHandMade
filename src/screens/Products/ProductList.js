import { Wallpaper } from '@components';
import React, { Component } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfilePicture } from '../../components';

export default class ProductList extends Component {
  static navigationOptions = ({navigation}) => {
    return { 
      title: 'Product List',
      headerRight: (
        <Button
          transparent
          onPress={() => console.log("View Product List Pressed")}
          title="Add"
        />
      )
    }
  }
  
  constructor(props) {
    super(props) 

    this.state = { 
      showProductList: false,
      //fetchingProductList: false,
      ProductListData: [
        {id: 0, productName: "Painted Pot", productURL: "https://images-na.ssl-images-amazon.com/images/I/51QSbi7H%2BvL.jpg"},
        {id: 1, productName: "Poncho", productURL: "https://thumbs4.ebaystatic.com/d/l225/m/mQjoqxfxjWICeCKJiKbNdAA.jpg"},
        {id: 2, productName: "Rancher Hat", productURL: "https://images-na.ssl-images-amazon.com/images/I/6198MgqxZ8L._UX679_.jpg"}, 
        {id: 3, productName: "Dress", productURL: "https://i.pinimg.com/originals/24/90/cb/2490cb95a0ad1a1945321744a45fad99.jpg"}
      ]
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
          <ProfilePicture
            source={{uri: item.productURL}}
            style={styles.image}
          />
          
          <View style={styles.nameItem}>
            <Text style={styles.text}>{item.productName}</Text>
          </View>
        </TouchableOpacity>
      )
  }

  _keyExtractor = (item, index) => item.uid

  /*
  sortedProducts() { 
    if(this.props.Products != []) {
      sortedProducts = Array.from(this.props.ProductList)
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
  }*/

  render() {
    return (
      <Wallpaper>
        {(this.props.Products != [] && this.state.fetchingProductList) ? 
        <ActivityIndicator 
          size='large'
          animating={this.props.spinning}
          color='white'
        />
        :
        <FlatList
          testID='product_list'
          data={this.state.ProductListData}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderProductListItem}
        />
        }
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
  nameItem: {
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