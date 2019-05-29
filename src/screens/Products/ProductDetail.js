import React, { Component } from 'react'
import {
  ProfilePicture,
  Wallpaper,
  CardSection
} from '@components'
import { Text, ScrollView, StyleSheet, LayoutAnimation } from 'react-native'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'
import StandardCard from '../../components/StandardCard'
import I18n from "../../utils/i18n"

class ProductDetail extends Component {
  static navigationOptions = ({navigation}) => {
    title: navigation.getParam('Title', 'Product Detail')
  };

  constructor(props) {
    super(props)
    this.state = {
      showModel: false,
      drawerOpen: false,
      editExpanded: true,
      statsExpanded: true,
      numSales: this.props.TimesSold
    }

    this.productsButtons = [
      // {
      //   title: 'Edit',
      //   onPress: () => this.navigateToEditProduct() 
      // },
      {
        title: I18n.t("ProductDetail.logSales", {locale: this.props.language}),
        onPress: () => this.navigateToLogSale()
      }
    ]

    this.props.navigation.setParams({Title: I18n.t("ProductDetail.title", {locale: this.props.language})})

    this.navigateToLogSale = this.navigateToLogSale.bind(this)
    this.navigateToEditProduct = this.navigateToEditProduct.bind(this)
  }

  componentDidUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  navigateToLogSale() {
    console.log("props")
    console.log(this.props)
    this.props.navigation.navigate('LogSale', {
      productId: this.props.productID
    })
  }

  navigateToEditProduct() {
    console.log("Button Pressed")
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <StandardCard 
            title={this.props.Title} 
            buttonsArray={this.productsButtons} 
          >
            <ProfilePicture
              source={{ uri: this.props.mainPictureURL }}
              style={styles.image}
            />
          </StandardCard>
          <StandardCard 
            title={this.props.MainCategory}
          >
            <Text style={styles.descriptionStyle}>
              {this.props.Description}
            </Text>
          </StandardCard>
          <StandardCard 
            title={I18n.t("ProductDetail.info", {locale: this.props.language})}
          >
            <CardSection
              style={{
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>{I18n.t("ProductDetail.subCat", {locale: this.props.language})}</Text>
              <Text style={styles.SectionListItemS}>
                {this.props.SubCategory}
              </Text>
            </CardSection>
            <CardSection
              style={{
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>{I18n.t("ProductDetail.price", {locale: this.props.language})}</Text>
              <Text style={styles.SectionListItemS}>
                {'$' + this.props.StandardPrice}
              </Text>
            </CardSection>
            <CardSection
              style={{
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>{I18n.t("ProductDetail.stock", {locale: this.props.language})}</Text>
              <Text style={styles.SectionListItemS}>{this.props.Quantity}</Text>
            </CardSection>
            <CardSection
              style={{
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>{I18n.t("ProductDetail.gender", {locale: this.props.language})}</Text>
              <Text style={styles.SectionListItemS}>{this.props.Gender}</Text>
            </CardSection>
            <CardSection
              style={{
                justifyContent: 'space-between'
              }}
            >
              <Text style={styles.ProductInfo}>{I18n.t("ProductDetail.number", {locale: this.props.language})}</Text>
              <Text style={styles.SectionListItemS}>
                {this.state.numSales}
              </Text>
            </CardSection>
          </StandardCard>
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
    flex: 1,
    borderWidth: 1,
    aspectRatio: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
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
    margin: 10,
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
})
export default withMappedNavigationParams()(ProductDetail)
