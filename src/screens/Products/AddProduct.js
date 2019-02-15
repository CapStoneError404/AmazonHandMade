import { AddImage, AsyncButton, UserInput, Wallpaper } from '@components';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, View, Text, TextInput, Picker, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

export default class AddProduct extends Component {
  static navigationOptions = {
    title: 'Add a Handmade Product'
  }

  constructor(props) {
    super(props)

    this.state = {
      productMainCategory: 'Handmade Apparel',
      productSubCategory: 'Activewear',

      productMainPicture: "",
      productTitle: "",
      productDescription: "",
      productGender: 'Women',
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
    });
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
        productMainCategory: this.state.productMainCategory.trim(),
        productSubCategory: this.state.productSubCategory.trim(),
        productMainPicture: this.state.productMainPicture.trim(),
        productTitle: this.state.productTitle.trim(),
        productDescription: this.state.productDescription.trim(),
        productGender: this.state.productGender.trim(),
        productStandardPrice: this.state.productStandardPrice,
        productSellerSKU: this.state.productSellerSKU.trim(),
        productQuantity: this.state.productQuantity,
        productTime: this.state.productTime,
        productTimesSold: this.state.productTimesSold
      }, this.props.navigation.getParam('currentUID')).then(() => {
        this.setState({adding: false})
        this.props.navigation.goBack()
      })
    }
  }

  render() {
    let categories = {'Handmade Apparel': ['Activewear', 'Babysuits', 'Costumes', 'Handmade Clothing Sets', 'Handmade Hoodies & Sweatshirts', 'Handmade Lingerie & Underwear', 'Handmade Maternity', 'Handmade Outerwear', 'Handmade Sleepwear & Robes', 'Handmade Socks, Tights & Leg Warmers', 'Handmade Suits & Blazers', 'Handmade Sweaters', 'Handmade Swimwear', 'Handmade Tops & Tees', 'Jeans', 'Leggings', 'Overalls', 'Pants', 'Rompers', 'Shorts', 'Skirts', 'Wedding Dresses'], 
    'Handmade Baby Products': ['Baby & Toddler Toys', 'Baby Care Products', 'Baby Gift Sets', 'Baby Keepsake Products', 'Child Carrier Products', 'Nursery Bedding', 'Nursery Decor', 'Nursery Furniture'], 
    'Handmade Beauty & Personal Care': ['Baby & Child Care', 'Fragrance', 'Hair Care', 'Health Care', 'Makeup', 'Oral Care', 'Personal Care', 'Shaving & Hair Removal', 'Skin Care', 'Tools & Accessories', 'Wellness & Relaxation'], 
    'Handmade Car Accessories': ['Car & Vehicle Accessories', 'Car & Vehicle Door Straps & Grab Handles', 'Car & Vehicle Electronic Accessories', 'Car & Vehicle Hitch Covers', 'Car & Vehicle Plates', 'Car & Vehicle Rearview Mirror Ornaments', 'Car & Vehicle Shift Knobs', 'Car & Vehicle Tire Covers', 'Golf Cart Seats & Covers', 'Vehicle Decals'], 
    'Handmade Electronics Accessories': ['Camera Accessories', 'Cell Phone Armbands', 'Cell Phone Carrying Cases', 'Cell Phones Decals', 'Cell Phone Protecive Skins', 'Computer Cases', 'Computer Wrist Rests', 'eBook Reader Covers', 'eBook Reader Protective Skins', 'eBook Reader Sleeves', 'eBook Reader Stands', 'Fitness Tracker Accessories', 'Laptop Computer Backpacks', 'Laptop Computer Briefcases', 'Laptop Computer Decals', 'Laptop Computer Hard Case Shells', 'Laptop Computer Messenger Bags', 'Laptop Computer Mounts', 'Laptop Computer Protective Skins', 'Laptop Computer Shoulder Bags', 'Laptop Computer Sleeves', 'Laptop Computer Stands', 'Mouse Pads', 'MP3 Player Cases', 'MP3 Player Decals', 'MP3 Player Protective Skins', 'Touch Screen Tablet Computer Bags', 'Touch Screen Tablet Computer Cases', 'Touch Screen Tablet Computer Decals', 'Touch Screen Tablet Computer Mounts', 'Touch Screen Tablet Computer Protective Screens', 'Touch Screen Tablet Computer Sleeves', 'Touch Screen Tablet Computer Stands', 'Vehicle Electronics Accessories'], 
    'Handmade Hair Accessories': ['Hair Barrettes', 'Hair Bun & Crown Shapers', 'Hair Claws', 'Hair Clips', 'Hair Comb Slides', 'Hair Elastics & Ties', 'Hair Extensions', 'Hair Pins', 'Hairpieces', 'Headbands', 'Tiaras', 'Wigs'], 
    'Handmade Handbags & Accessories': ['Apparel Accessories', 'Handbags'], 
    'Handmade Home & Kitchen Products': ['Artwork', 'Bath', 'Bedding', 'Cleaning Supplies', 'Furniture', 'Home Decor', 'Kitchen & Dining', 'Stationery & Party Supplies', 'Storage & Organization'], 
    'Handmade Jewelry': ['Anklets', 'Body Jewlery', 'Bracelets', 'Brooches', 'Charms', 'Cufflinks', 'Earrings', 'Hair Jewelry', 'Jewelry Coins', 'Jewelry Pins', 'Jewelry Pouches', 'Jewelry Sets', 'Necklaces', 'Pendants', 'Ring Cushions', 'Rings', 'Shirt Studs', 'Tie Clips', 'Tie Pins', 'Wedding & Engagement Rings'], 
    'Handmade Lighting': ['Ceiling Lighting', 'Lamps', 'Lanterns', 'Lightswitch Plates', 'Outdoor Lighting', 'Wall Lighting Fixtures'],
    'Handmade Luggage & Travel Accessories': ['Luggage', 'Travel Accessories'], 
    'Handmade Outdoor & Patio': ['Arbors', 'Birdbath Accessories', 'Birdbaths', 'Birdfeeder Accessories', 'Birdhouses', 'Garden Stakes', 'Outdoor Chimes', 'Outdoor Clocks', 'Outdoor Curtains', 'Outdoor Decorative Fences', 'Outdoor Decorative Stones', 'Outdoor Flag Accessories', 'Outdoor Flags', 'Outdoor Flower Pots', 'Outdoor Fountain Accessories', 'Outdoor Fountains', 'Outdoor Hanging Planters', 'Outdoor Planter Boxes', 'Outdoor Statues', 'Outdoor Sun Catchers', 'Outdoor Sundials', 'Outdoor Urns', 'Outdoor Window Boxes', 'Outdoor Yard Signs', 'Weathervanes', 'Wind Sculptures', 'Wind Spinners'], 
    'Handmade Pet Supplies': ['Pet Apparel & Accessories', 'Pet Beds & Furniture', 'Pet Cages & Accessories', 'Pet Carriers & Travel Products', 'Pet Collars, Harnesses & Leashes', 'Pet Crates & Kennels', 'Pet Doors & Gates', 'Pet Feeding & Watering Supplies', 'Pet Flea & Tick Control', 'Pet Flood', 'Pet Grooming Supplies', 'Pet Health & Wellness', 'Pet Houses & Habitats', 'Pet Litter & Housebreaking', 'Pet Memorials & Urns', 'Pet Storage & Organization', 'Pet Toys', 'Pet Training Equipment', 'Pet Treats'], 
    'Handmade Shoe Accessories': ['Decorative Shoe Clips', 'Insoles', 'Shoe Care Tools', 'Shoe Horns', 'Shoe Trees', 'Shoelaces', 'Shoes Bags'], 
    'Handmade Shoes': ['Baby Booties & Crib Shoes', 'Ballet Flats', 'Boots', 'Clogs & Mules', 'First Walking Shoes', 'Loafers & Slip-Ons', 'Mary Janes', 'Oxfords', 'Pumps', 'Sandals', 'Slippers', 'Sneakers & Athletic Shoes'], 
    'Handmade Sports & Outdoors': ['Camping & Hiking Equipment', 'Cycling Equipment', 'Fishing Equipment', 'Hunting & Shooting Equipment', 'Lawn & Playground Equipment', 'Sports & Fitness Equipment'], 
    'Handmade Toys & Games': ['Handmade Games', 'Handmade Toys']}

    return (
      <Wallpaper style={styles.container}>
      <ScrollView>
        <AddImage 
          imageUri={this.state.productMainPicture}
          onPress={() => this.pickImage()}
          style={styles.image}
        />
        <View>
          <Picker
            style={styles.categorySection} 
            itemStyle={styles.PickerItem}
            selectedValue={this.state.productMainCategory}
            testID="MainCategorySelectorID"
            onValueChange={(itemValue, itemIndex) =>
              this.setState({productMainCategory: itemValue})
            }>
            {Object.keys(categories).map(m => {
              return <Picker.Item key={m} label={m} value={m} />
            })}
          </Picker>
        </View>

        <View>
          <Picker
            style={styles.categorySection} 
            itemStyle={styles.PickerItem}
            enabled={this.state.productMainCategory != ''}
            selectedValue={this.state.productSubCategory}
            testID="SubCategorySelectorID"
            //style={styles.categorySection}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({productSubCategory: itemValue})
            }>
            {
              (this.state.productMainCategory != "")? 
              categories[this.state.productMainCategory].map(s => {
                 return <Picker.Item label={s} value={s} key={s}/>
              }) : null 
            }
          </Picker>
         </View>

        <Text style={styles.labelText}>Title</Text>
        <View style={this.state.focusedInputs.title? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
          <TextInput
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
            placeholder="Ex: Please see Amazon Site for an example"
            value={this.state.productDescription}
            onChangeText={(newText) => this.setState({productDescription: newText})}
            onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, desc: true}})}
            onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, desc: false}})}
          />
        </View>

        <View>
          <Picker
            style={styles.categorySection} 
            itemStyle={styles.PickerItem}
            selectedValue={this.state.productGender}
            testID="genderSelectorID"
            //style={{height: 50, width: 200}}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({productGender: itemValue})
            }>
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
            keyboardType='numeric'
            placeholder="Ex. 4"
            value={this.state.productQuantity}
            onChangeText={(newText) => this.setState({productQuantity: newText})}
            onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, quantity: true}})}
            onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, quantity: false}})}
          /> 
        </View>

        <Text style={styles.labelText}>Production Time</Text>
        <View style={this.state.focusedInputs.time? [styles.focusedInputSection, styles.InputWrapper] :styles.InputWrapper}>
          <TextInput
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
  image: {
    alignSelf: 'center',
    padding: '25%',
    borderRadius: 5
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
    height: 'auto',
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
  }
})