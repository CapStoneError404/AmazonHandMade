import React, { Component } from 'react'
import {
  ProfilePicture,
  Wallpaper,
  AsyncButton,
  Card,
  CardSection,
  Button,
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
import { Icon } from 'react-native-elements'
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
        onPress: () =>
          this.props.navigation.navigate('AddProduct', {
            currentUID: this.props.uid,
            onNavigateBack: this.handleOnNavigateBack,
            previousScreen: 'artisanDetail'
          })   
      },
      {
        title: 'View All',
        onPress: () => this.navigateToProductList() 
      }
    ]

    this.onCancel = this.onCancel.bind(this)
    this.deletePressed = this.deletePressed.bind(this)
    this.showAlert = this.showAlert.bind(this)
    this.renderProductButton = this.renderProductButton.bind(this)
    this.navigateToEditArtisan = this.navigateToEditArtisan.bind(this)
    this.fetchProducts = this.fetchProducts.bind(this)
    this.sortedProducts = this.sortedProducts.bind(this)
    this.navigateToProductList = this.navigateToProductList.bind(this)
    this.onIconPress = this.onIconPress.bind(this)
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
  

  //Renders the edit button and message button when button is clicked
//   renderEditButton() {
//     if (this.state.editExpanded) {
//       return (
//         <CardSection style={{ backgroundColor: 'white' }}>
//           <Button
//             style={{ height: 20, backgroundColor: 'white' }}
//             title="Edit"
//             textColor="orange"
//             onPress={() => this.navigateToEditArtisan()}
//           />
//           <Button
//             style={{ height: 25, backgroundColor: 'white' }}
//             title="Message"
//             textColor="orange"
//             onPress={() => console.log('Pressed message button')}
//           />
//         </CardSection>
//       )
//     }
//   }

  renderProductButton() {
    if (this.state.productsExpanded) {
      return (
        <CardSection style={{ backgroundColor: 'white' }}>
          <Button
            style={{ height: 20, backgroundColor: 'white' }}
            title="Add"
            textColor="orange"
            onPress={() =>
              this.props.navigation.navigate('AddProduct', {
                currentUID: this.props.uid,
                onNavigateBack: this.handleOnNavigateBack,
                previousScreen: 'artisanDetail'
              })
            }
          />
          <Button
            style={{ height: 20, backgroundColor: 'white' }}
            title="View All"
            textColor="orange"
            onPress={() => this.navigateToProductList()}
          />
        </CardSection>
      )
    }
  }

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

  onIconPress() {
    this.setState({ editExpanded: !this.state.editExpanded })
  }

//   artisanInfoButtons = [
//     {
//       title: 'Edit',
//       onPress: () => this.navigateToEditArtisan()
//     },
//     {
//       title: 'Message',
//       onPress: () => console.log("Message Artisan")
//     }
//   ]

//   productsButtons = [
//     {
//       title: 'Add',
//       onPress: () =>
//         this.props.navigation.navigate('AddProduct', {
//           currentUID: this.props.uid,
//           onNavigateBack: this.handleOnNavigateBack,
//           previousScreen: 'artisanDetail'
//         })   
//     },
//     {
//       title: 'View All',
//       onPress: () => this.navigateToProductList() 
//     }
//   ]

  render() {
    const { name, phoneNumber, description, profilePictureURL } = this.state.currentArtisan
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          {/* <Card>
            <CardSection
              style={{
                backgroundColor: 'rgb(71, 77, 84)',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.headerText}>Artisan info</Text>
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
            {this.renderEditButton()}
          </Card> */}
          {/* buttonsArray={this.artisanInfoButtons} */}
          <StandardCard title="Artisan Info" iconOnPress={this.onIconPress} buttonsArray={this.artisanInfoButtons} >
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
          <Card>
            <CardSection
              style={{
                backgroundColor: 'rgb(71, 77, 84)',
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.headerText}>Top Products</Text>
              <Icon
                name="dots-vertical"
                size={30}
                color="orange"
                type="material-community"
                underlayColor={'rgb(71, 77, 84)'}
                onPress={() =>
                  this.setState({
                    productsExpanded: !this.state.productsExpanded
                  })
                }
              />
            </CardSection>
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
            {this.renderProductButton()}
          </Card>

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
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  }
})

export default withMappedNavigationProps()(ArtisanDetail)
