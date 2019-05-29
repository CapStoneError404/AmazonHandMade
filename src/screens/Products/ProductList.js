import { Wallpaper } from '@components'
import React, { Component } from 'react'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'
import { ProfilePicture } from '../../components'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

class ProductList extends Component {
  static navigationOptions = ({navigation}) => {
    return { 
      title: 'Product List',
      headerRight: (
        <View style={{paddingRight: 20}}>
          <Button
            transparent
            onPress={() => navigation.navigate('AddProduct', {
              currentUID: navigation.getParam('currentUID'), 
              onNavigateBack: navigation.getParam('onNavigateBack'),
              previousScreen: 'productList',
              renderArtisanDetail: navigation.state.params.onProductListBack
            })}
            title="Add"
          />
        </View>
      )
    }
  }
  
  constructor(props) {
    super(props) 

    this.state = { 
      showProductList: false,
      currentProducts: this.props.currentProducts,
      text: ""
    }

  }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.Products != null){
      this.searchFilterFunction()
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

  searchFilterFunction() {
    if (!this.state.text) {
      this.setState({ currentProducts: this.props.Products })
    }
    else {
      const newData = this.props.Products.filter((item) => {
        const title = item.Title.toLowerCase()
        const textData = this.state.text.toLowerCase()
        return title.indexOf(textData) !== -1
      })
      
      this.setState({
        currentProducts: newData // after filter we are setting products to new array
      })
    }
  }

  _renderProductListItem = ({item, index}) => {
    console.log(item)
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
        <TextInput
          style={styles.input}
          value={this.state.text}
          onChangeText={(newText) => this.setState({ text: newText }, this.searchFilterFunction)}
          underlineColorAndroid="transparent"
          placeholder="Search Products"
        />
        {(this.props.Products != [] && this.state.fetchingProductList) ? 
          <ActivityIndicator 
            size='large'
            animating={this.props.spinning}
            color='white'
          />
          :
          <FlatList
            testID='product_list'
            extraData={this.state.currentProducts}
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
  },
  input: {
    height: 60,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 20,
    borderRadius: 10,
    margin: 10,
    fontSize: 20
  }
})

export default withMappedNavigationParams()(ProductList)