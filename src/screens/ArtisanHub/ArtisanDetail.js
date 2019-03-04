import React, { Component } from 'react'
import {
  ProfilePicture,
  Wallpaper,
  AsyncButton,
  CardSection,
  StandardCard
} from '@components'
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Alert,
  Image,
  TouchableOpacity,
  LayoutAnimation,
  ActivityIndicator
} from 'react-native'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import { FlatGrid } from 'react-native-super-grid'
class ArtisanDetail extends Component {
  static navigationOptions = () => {
    return {
      title: 'Artisan Details'
    }
  };

  constructor(props) {
    super(props)

    this.state = {
      showModel: false,
      adding: false,
      drawerOpen: false,
      fetchingProducts: false,
      editExpanded: true,
      productsExpanded: true,
      currentArtisan: this.props.Artisans.find(
        item => item.uid === this.props.uid
      ),
      currentProducts: []
    }

    this.artisanInfoButtons = [
      {
        title: 'Edit',
        onPress: () => this.navigateToEditArtisan()
      },
      {
        title: 'Message',
        onPress: () => console.log("Message Artisan")
      }
    ]

    this.productsButtons = [
      {
        title: 'Add',
        onPress: () => this.navigateToAddProduct() 
      },
      {
        title: 'View All',
        onPress: () => this.navigateToProductList() 
      }
    ]

    this.transactionButtons = [
      {
        title: 'Payouts',
        onPress: () => console.log('Button 1 pressed')
      },
      {
        title: 'View All',
        onPress: () => console.log('Button 2 pressed')
      }
    ]

    this.onCancel = this.onCancel.bind(this)
    this.deletePressed = this.deletePressed.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.navigateToEditArtisan = this.navigateToEditArtisan.bind(this)
    this.fetchProducts = this.fetchProducts.bind(this)
    this.sortedProducts = this.sortedProducts.bind(this)
    this.navigateToProductList = this.navigateToProductList.bind(this)
    this.onIconPress = this.onIconPress.bind(this)
    this.renderListOfProducts = this.renderListOfProducts.bind(this)
    this.navigateToAddProduct = this.navigateToAddProduct.bind(this)
  }

  componentDidMount() {
    this.fetchProducts()
  }

  componentDidUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  onCancel() {
    this.setState({ adding: false })
  }

  deletePressed() {
    this.setState({ adding: true })
    this.props.deleteArtisan(this.props.Artisans, this.props.uid).then(() => {
      this.setState({ adding: false })
      this.props.navigation.navigate('ArtisanList')
    })
  }

  fetchProducts() {
    const { uid } = this.props
    this.setState({ fetchingProducts: true })
    this.props.fetchProducts(uid).then(() => {
      this.setState({
        fetchingProducts: false,
        currentProducts: this.props.Products
      })
    })
  }

  navigateToAddProduct() {
    const { uid, navigation } = this.props
    navigation.navigate('AddProduct', {
      currentUID: uid,
      onNavigateBack: this.handleOnNavigateBack,
      previousScreen: 'artisanDetail'
    })  
  }

  navigateToEditArtisan() {
    const { name, phoneNumber, description, uid } = this.state.currentArtisan
    this.props.navigation.navigate('EditArtisan', {
      name,
      phoneNumber,
      description,
      uid,
      onNavigateBack: this.handleOnNavigateBack
    })
  }

  navigateToProductList() {
    this.props.navigation.navigate('ProductList', { 
      currentProducts: this.sortedProducts(), 
      currentUID: this.props.uid,
      onProductListBack: this.handleOnNavigateBack
    })
  }

  //This method is needed to update artisan detail on the fly if using react navigation
  handleOnNavigateBack = () => {
    this.fetchProducts()
    this.setState({
      currentArtisan: this.props.Artisans.find(
        item => item.uid === this.props.uid
      )
    })
  };
  
  showAlert() {
    Alert.alert(
      'Are you sure want delete Artisan?',
      'Delete Artisan',
      [
        {
          text: 'Cancel',
          onPress: () => this.onCancel(),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => this.deletePressed() }
      ],
      { cancelable: false }
    )
  }

  sortedProducts() {
    if (this.state.currentProducts !== []) {
      sortedProducts = Array.from(this.state.currentProducts)
      sortedProducts.sort((first, second) => {
        p1 = first.TimesSold
        p2 = second.TimesSold
        if (p1 < p2) return 1
        else if (p1 > p2) return -1
        else return 0
      })
      return sortedProducts
    } else {
      return []
    }
  }

  renderListOfProducts() {
    return(
      <CardSection>
        {this.props.Products != [] && this.state.fetchingProducts ? (
          <ActivityIndicator
            size="large"
            animating={this.props.spinning}
            color="white"
          />
        ) : (
          <FlatGrid
            itemDimension={90}
            items={this.sortedProducts().slice(0, 6)}
            style={styles.gridView}
            extraData={this.state}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  style={styles.elevationLow}
                  onPress={() =>
                    this.props.navigation.navigate('ProductDetail', {
                      ...item
                    })
                  }
                >
                  <Image
                    style={styles.imageContainer}
                    source={{ uri: item.mainPictureURL }}
                  />
                </TouchableOpacity>
              )
            }}
          />
        )}
      </CardSection>
    )
  }

  onIconPress() {
    this.setState({ editExpanded: !this.state.editExpanded })
  }

  render() {
    const { name, phoneNumber, description, profilePictureURL } = this.state.currentArtisan
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <StandardCard 
            title="Artisan Info" 
            buttonsArray={this.artisanInfoButtons} 
          >
            <CardSection>
              <ProfilePicture
                source={{ uri: profilePictureURL }}
                style={styles.image}
              />
              <View style={{ flex: 1, flexDirection: 'column' }}>
                <Text style={styles.nameStyle}>{name}</Text>
                <Text style={styles.phoneStyle}>{phoneNumber}</Text>
                <Text style={styles.phoneStyle}>Location: Mexico</Text>
              </View>
            </CardSection>
            <CardSection style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.descriptionStyle}>{description}</Text>
            </CardSection>
          </StandardCard>

          <StandardCard 
            title="Top Products" 
            buttonsArray={this.productsButtons}
          >
            {this.renderListOfProducts()}
          </StandardCard>

          <StandardCard
            title="Transactions"
            buttonsArray={this.transactionButtons}
          >
            <CardSection style={{ flex: 1, flexDirection: 'column' }}>
              <Text style={styles.descriptionStyle}>Total money owed: $1000</Text>
              <Text style={styles.descriptionStyle}>Mony Paid: $ 2000</Text>
              <Text style={styles.descriptionStyle}>Some other stats and stuff</Text>
            </CardSection>
            
          </StandardCard>
         
          <AsyncButton
            title="Delete Artisan"
            color="red"
            textColor="white"
            onPress={this.showAlert}
            style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
            spinning={this.state.adding}
          />
        </ScrollView>
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    flex: 1
  },
  image: {
    height: 120,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 60,
    margin: 5
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
    fontSize: 20,
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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
})

export default withMappedNavigationProps()(ArtisanDetail)
