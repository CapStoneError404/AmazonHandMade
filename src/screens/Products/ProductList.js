import { Wallpaper } from '@components'
import React, { Component } from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProfilePicture } from '../../components'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

class ProductList extends Component {
  static navigationOptions = ({navigation}) => {
    return { 
      title: 'Product List',
      headerRight: (
        <Button
          transparent
          onPress={() => navigation.navigate('AddProduct', {
            currentUID: navigation.getParam('currentUID'), 
            onNavigateBack: navigation.getParam('onNavigateBack'),
            renderArtisanDetail: navigation.state.params.onProductListBack
          })}
          title="Add"
        />
      )
    }
  }
  
  constructor(props) {
    super(props) 

    this.state = { 
      showProductList: false,
      currentProducts: this.props.currentProducts
    }

  }

  componentDidMount() {
    this.props.navigation.setParams({ onNavigateBack: this.handleOnNavigateBack })
  }

  handleOnNavigateBack = () => {
    this.setState({
      currentProducts: this.props.Products
    })
  };

  _renderProductListItem = ({item, index}) => {

    return (
      <TouchableOpacity
        testID={`listItem${index}`}
        style={styles.productListView}
        onPress={() => this.props.navigation.navigate('ProductDetail', {...item})}
        key={item.key}
      >
        <ProfilePicture
          source={{uri: item.mainPictureURL}}
          style={styles.image}
        />
          
        <View style={styles.nameItem}>
          <Text style={styles.text}>{item.Title}</Text>
          <Text style={styles.text}>{`Price: $${item.StandardPrice}`}</Text>
          <Text style={styles.text}>{`Quantity: ${item.Quantity}`}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item) => item.productID

  
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
            data={this.state.currentProducts}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderProductListItem}
            extraData={this.state}
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

export default withMappedNavigationProps()(ProductList)