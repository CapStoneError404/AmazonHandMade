import { AddImage, AsyncButton, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, ScrollView, View, Text, TextInput, Picker } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'
import { ProductCategories } from './ProductCategories'

class AddProduct extends Component {
  static navigationOptions = {
    title: 'Add Product'
  }
  constructor(props) {
    super(props)

    this.state = {
      productMainCategory: '', 
      productSubCategory: '', 
      productGender: '',
      productMainPicture: "",
      productTitle: "",
      productDescription: "",
      productStandardPrice: "",
      productSellerSKU: "",
      productQuantity: "",
      productTime: "",

      //If you adding product, assumes never sold before
      productTimesSold: 0,
      focusedInputs: {title: false, desc: false, price: false, sku: false, quantity: false, time: false},
      adding: false
    }

    this.pickImage = this.pickImage.bind(this)
    this.createProduct = this.createProduct.bind(this)
    this.verifyFields = this.verifyFields.bind(this)
  }

  pickImage() {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true
    }).then(image => {
      this.setState({productMainPicture: image.path})
    })
  }

  verifyFields() {
    if(!this.state.productMainCategory)
      this.props.displayError("! The required field Main Category is empty.")
    else if(!this.state.productSubCategory)
      this.props.displayError("! The required field Subcategory is empty.")
    else if(!this.state.productMainPicture)
      this.props.displayError("! The required field Main Picture is empty.")
    else if(!this.state.productTitle)
      this.props.displayError("! The required field Title is empty.")
    else if(!this.state.productDescription)
      this.props.displayError("! The required field Product Description is empty.")
    else if(!this.state.productGender)
      this.props.displayError("! The required field Gender is empty.")
    else if(!this.state.productStandardPrice)
      this.props.displayError("! The required field Standard Price is empty.")
    else if(!this.state.productSellerSKU)
      this.props.displayError("! The required field ? is empty.")
    else if(!this.state.productQuantity)
      this.props.displayError("! The required field Quantity is empty.")
    else if(!this.state.productTime)
      this.props.displayError("! The required field Production Time is empty.")

    return this.state.productMainCategory && this.state.productSubCategory
      && this.state.productMainPicture && this.state.productTitle && this.state.productDescription
      && this.state.productGender && this.state.productStandardPrice && this.state.productSellerSKU
      && this.state.productQuantity && this.state.productTime
  }
  
  createProduct() {
    if(this.verifyFields()) {
      this.setState({adding: true})
      this.props.createProduct({
        mainCategory: this.state.productMainCategory.trim(),
        subCategory: this.state.productSubCategory.trim(),
        mainPicture: this.state.productMainPicture.trim(),
        title: this.state.productTitle.trim(),
        description: this.state.productDescription.trim(),
        gender: this.state.productGender.trim(),
        standardPrice: this.state.productStandardPrice,
        sellerSKU: this.state.productSellerSKU.trim(),
        quantity: this.state.productQuantity,
        productionTime: this.state.productTime,
        timesSold: this.state.productTimesSold
      }, this.props.navigation.getParam('currentUID')).then(() => {
        this.setState({adding: false})
        this.props.navigation.state.params.onNavigateBack()
        this.props.navigation.state.params.renderArtisanDetail()
        this.props.navigation.goBack()
      })
    }
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView>
          <View style={styles.imageWrapper}>
            <AddImage 
              imageUri={this.state.productMainPicture}
              onPress={() => this.pickImage()}
              style={styles.image}
            />
          </View>

          <Text style={styles.labelText}>Product Main Category</Text>
          <View style={styles.categorySection}>
            <Picker
              itemStyle={styles.PickerItem}
              selectedValue={this.state.productMainCategory}
              testID="MainCategorySelectorID"
              onValueChange={(itemValue, itemIndex) =>
                (itemIndex !=0) && this.setState({productMainCategory: itemValue}) 
                && this.setState({productSubCategory: ''})
              }>
              {Object.keys(ProductCategories).map(m => {
                return <Picker.Item key={m} label={m} value={m} />
              })}
            </Picker>
          </View>

          <Text style={styles.labelText}>Product Subcategory</Text>
          <View style={styles.categorySection}>
            <Picker
              itemStyle={styles.PickerItem}
              enabled={this.state.productMainCategory != ''}
              selectedValue={this.state.productSubCategory}
              testID="SubCategorySelectorID"
              //style={styles.categorySection}
              onValueChange={(itemValue, itemIndex) =>
                (itemIndex !=0) && this.setState({productSubCategory: itemValue})
              }>
              {
                (this.state.productMainCategory != "")? 
                  ProductCategories[this.state.productMainCategory].map(s => {
                    return <Picker.Item label={s} value={s} key={s}/>
                  }) : null 
              }
            </Picker>
          </View>

          <Text style={styles.labelText}>Title</Text>
          <View style={this.state.focusedInputs.title? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              placeholder= "Ex: Rawhide Leather Jacket"
              value={this.state.productTitle}
              onChangeText={(newText) => this.setState({productTitle: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, title: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, title: false}})}
            />
          </View>

          <Text style={styles.labelText}>Product Description</Text>
          <View style={this.state.focusedInputs.desc? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Ex: Please see Amazon Site for an example"
              value={this.state.productDescription}
              onChangeText={(newText) => this.setState({productDescription: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, desc: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, desc: false}})}
            />
          </View>

          <Text style={styles.labelText}>Gender Type</Text>
          <View style={styles.categorySection}>
            <Picker
              itemStyle={styles.PickerItem}
              selectedValue={this.state.productGender}
              testID="genderSelectorID"
              //style={{height: 50, width: 200}}
              onValueChange={(itemValue, itemIndex) =>
                (itemIndex !=0) && this.setState({productGender: itemValue})
              }>
              <Picker.Item label="Pick a gender type..." value="pick-one" />
              <Picker.Item label="Women" value="women" />
              <Picker.Item label="Men" value="men" />
              <Picker.Item label="Girls" value="girls" />
              <Picker.Item label="Boys" value="boys" />
              <Picker.Item label="Unisex Adult" value="unisex-adult" />
              <Picker.Item label="Unisex Child" value="unisex-child" />
            </Picker>
          </View>

          <Text style={styles.labelText}>Standard Price</Text>
          <View style={this.state.focusedInputs.price? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              keyboardType='numeric'
              placeholder="Ex: 49.99"
              value={this.state.productStandardPrice}
              onChangeText={(newText) => this.setState({productStandardPrice: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, price: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, price: false}})}
            />
          </View>

          <Text style={styles.labelText}>Seller SKU</Text>
          <View style={this.state.focusedInputs.sku? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              placeholder="Ex: MyProduct123"
              value={this.state.productSellerSKU}
              onChangeText={(newText) => this.setState({productSellerSKU: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, sku: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, sku: false}})}
            />
          </View>

          <Text style={styles.labelText}>Quantity</Text>
          <View style={this.state.focusedInputs.quantity? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              keyboardType='numeric'
              placeholder="Ex. 4"
              value={this.state.productQuantity}
              onChangeText={(newText) => this.setState({productQuantity: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, quantity: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, quantity: false}})}
            /> 
          </View>

          <Text style={styles.labelText}>Production Time (days)</Text>
          <View style={this.state.focusedInputs.time? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
            <TextInput
              style={styles.textInputStyle}
              keyboardType='numeric'
              placeholder="Ex: 5"
              value={this.state.productTime}
              onChangeText={(newText) => this.setState({productTime: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, time: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, time: false}})}
            />     
          </View>

          <AsyncButton 
            title="Save & Publish"
            color="#c14700"
            textColor="white"
            onPress={this.createProduct}
            style={styles.button}
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
    padding: '2%',
    margin: 0
  },
  labelText: {
    //margin based off inputwrapper width
    marginLeft: '5%',
    fontSize: 17,
    fontWeight: 'bold' 
  },
  imageWrapper: {
    padding: '5%'
  },
  image: {
    alignSelf: 'center',
    //padding: '25%',
    borderRadius: 5,
    width: 200,
    height: 200
  },
  categorySection: {
    alignSelf: 'center',
    width: '90%',
    height: 60,
    color: '#808080',
    backgroundColor: 'white',
    margin: '4%',
    borderRadius: 10,
  },
  PickerItem: {
    height: 60,
    color: 'black'
  },
  categoryText: {
    //width: '100%',
    color: 'red',
    //fontFamily:"Ebrima",
    //fontSize: 17 
  },
  focusedInputSection: {
    borderWidth: 2,
    borderColor: 'orange' 
  },
  InputWrapper: {
    alignSelf: 'center',
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.85)',
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 10,
    width: '90%'
  },
  button: {
    borderRadius: 5, 
    alignSelf: 'center',
    //marginTop: '10%',
    width: '80%'
  },
  textInputStyle: {
    height: 50
  }
})

export default withMappedNavigationProps()(AddProduct)