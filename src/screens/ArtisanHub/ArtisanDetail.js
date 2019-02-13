import { ProfilePicture, Wallpaper, AsyncButton, Card, CardSection, Button } from '@components';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, Alert, Image, TouchableOpacity } from 'react-native';
import { withMappedNavigationProps } from 'react-navigation-props-mapper';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FlatGrid, SectionGrid } from 'react-native-super-grid';
import { NavigationActions } from 'react-navigation';

class ArtisanDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
       title: "Artisan Details",
    }
  }

  constructor(props) {
    super(props)

    this.state = {
       showModel: false,
       adding: false,
       drawerOpen: false,
       images: [
         { id: 0, productUrl: 'https://i.pinimg.com/originals/87/2c/83/872c83322f27c9527a255149b03d4dfe.jpg'},
         { id: 1, productUrl: 'https://images-na.ssl-images-amazon.com/images/I/51jzNmEmiIL._AC_US400_QL65_.jpg'},
         { id: 2, productUrl: 'https://images-na.ssl-images-amazon.com/images/I/51svf2meabL._AC_US400_QL65_.jpg'},
         { id: 3, productUrl: 'https://images-na.ssl-images-amazon.com/images/I/417u2WxNYZL._AC_US400_QL65_.jpg'},
         { id: 4, productUrl: 'https://images-na.ssl-images-amazon.com/images/I/51nXE7AcuYL._AC_US400_QL65_.jpg'},
         { id: 5, productUrl: 'https://m.media-amazon.com/images/I/71DSpZ0ZQbL._AC_UL640_QL65_.jpg'},
       ]
    }

    this.onCancel = this.onCancel.bind(this);
    this.deletePressed = this.deletePressed.bind(this);
    this.showAlert = this.showAlert.bind(this);
    //this.navigateToArtisan = this.navigateToArtisan.bind(this)
  }

   onCancel() {
      this.setState({ adding: false });
   }

   deletePressed() {
      this.setState({ adding: true });
      this.props.deleteArtisan(this.props.Artisans, this.props.uid)
      .then(() => {
        this.setState({ adding: false })
        this.props.navigation.navigate("ArtisanList")
      });
   }

   showAlert() {
      Alert.alert(
         'Are you sure want delete Artisan?',
         'Delete Artisan',
         [
           {
              text: 'Cancel',
              onPress: () => this.onCancel(),
              style: 'cancel',
           },
          {text: 'OK', onPress: () => this.deletePressed()},
         ],
         {cancelable: false},
      );
   }

   sortedTopProducts() {
      //if products array is not empty then sort by
      //how many of that item has been sold
      //The top 6 will be displayed on screen
   }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          {/* <View style={styles.firstSection}>
            <ProfilePicture 
              source={{uri: this.props.profilePictureURL}}
              style={styles.image}
            />
            <View style={styles.namePhone}>
              <Text style={styles.text}>{this.props.name}</Text>
              <Text style={styles.text}>{this.props.phoneNumber}</Text>
            </View>
            <View style={styles.description}>
              <Text style={styles.text}>{this.props.description}</Text>
            </View>
          </View> */}
          <Card>
             <CardSection style={{ backgroundColor: 'rgb(71, 77, 84)'}}>
                <Text style={styles.headerText}>Artisan info</Text>
             </CardSection>
             <CardSection>
                  <ProfilePicture 
                  source={{uri: this.props.profilePictureURL}}
                  style={styles.image}
                  />
                  <View style={{flexGrow: 1}}>
                    <Text style={styles.nameStyle}>{this.props.name}</Text>
                    <Text style={styles.phoneStyle}>{this.props.phoneNumber}</Text>
                    <Text style={styles.phoneStyle}>Location</Text>
                  </View>
             </CardSection>

             <CardSection>
               <Text style={styles.descriptionTitle}>Description</Text>
               <Text style={styles.descriptionStyle}>{this.props.description}</Text>
             </CardSection>
             <CardSection>
               <Button style={{ height: 20 }} title='Edit' textColor='orange' onPress={() => console.log("Pressed edit button")}/>
             </CardSection>
          </Card>
          
          <Card>
             <CardSection style={{ backgroundColor: 'rgb(71, 77, 84)'}}>
                <Text style={styles.headerText}>Top Products</Text>
             </CardSection>
             <CardSection>
               <FlatGrid
                 itemDimension={110}
                 items={this.state.images}
                 //   sections={[
                 //      {
                 //        title: 'Top Products',
                 //        data: this.state.images.slice(0, 6),
                 //      }
                 //    ]}
                    
                 //    renderSectionHeader={({ section }) => (
                 //      <Text style={styles.sectionHeader2}>{section.title}</Text>
                 //   )}
                 style={styles.gridView}
                 renderItem={({ item, section, index }) => {
                    
                    console.log(item);
                    return (
                       <TouchableOpacity style={styles.itemContainer} onPress={() => this.props.navigation.navigate('ProductDetail', {...item})}>
                          <Image style={styles.itemContainer2} source={{uri: item.productUrl} }/>
                       </TouchableOpacity>
                    )
                 }}   
               />
             </CardSection>
             <CardSection>
               <Button style={{ height: 20 }} title='Add' textColor='orange' onPress={() => console.log("Pressed edit button")}/>
               <Button style={{ height: 20 }} title='View All' textColor='orange' onPress={() => console.log("Pressed edit button")}/>
             </CardSection>
            
          </Card>
            
        </ScrollView>
        
            {/* <ActionButton buttonColor='orange' verticalOrientation='up' position='left' spacing={10} style={{ flex: 0.2}} >
               <ActionButton.Item buttonColor='red' title="Delete Artisan" onPress={this.showAlert}>
                 <Icon name="user-minus" style={styles.actionButtonIcon} />
               </ActionButton.Item>
               <ActionButton.Item buttonColor='green' title="Add Product" onPress={() => this.props.navigation.navigate('AddProduct')}>
                 <Icon name="plus" style={styles.actionButtonIcon} />
               </ActionButton.Item>
               <ActionButton.Item buttonColor='blue' title="View Product List" onPress={() => console.log('navigate to product list page')}>
                 <Icon name="list-ul" style={styles.actionButtonIcon} />
               </ActionButton.Item>
            </ActionButton> */}
         
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
  firstSection: {
    height: 200,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  nameStyle: {
   flex: 1,
   fontSize: 30,
   color: '#444444',
   marginLeft: 5,
  },
  phoneStyle: {
   flex: 2,
   fontSize: 20,
   color: '#444444',
   marginLeft: 5
  },
  namePhone: {
   flex: 2,
   height: '100%',
   flexDirection: 'column',
   alignItems: 'stretch',
   justifyContent: 'space-evenly',
   width: '100%',
  },
  descriptionStyle: {
   //  flex: 1,
   //  flexDirection: 'column',
   //  backgroundColor: 'white',
   //  borderRadius: 5,
   //  margin: 10,
   //  padding: 10
   flex: 2,
   fontSize: 20,
   color: '#444444',
   marginLeft: 5,
   flexDirection: 'row',
  },
  descriptionTitle: {
   flexDirection: 'row',
   flex: 1,
   fontSize: 20,
   color: '#444444',
   marginLeft: 5
  },
  text: {
    fontSize: 20,
    color: '#444444',
    marginLeft: 5
  },
  headerText: {
   fontSize: 20,
   color: 'white',
   marginLeft: 5
  },
  buttonStyle: {
     marginLeft:10,
     marginRight: 10
  },
  actionButtonIcon: {
   fontSize: 20,
   height: 22,
   color: 'white',
 },
 gridView: {
   marginTop: 10,
   flex: 1,
   flexDirection: 'row'
 },
 itemContainer: {
   justifyContent: 'space-evenly',
   borderRadius: 5,
   height: 160,
   width: 160,
   backgroundColor: 'rgb(71, 77, 84)'
 },
 itemContainer2: {
   justifyContent: 'space-evenly',
   borderRadius: 5,
   height: 155,
   width: 155,
   alignSelf: 'center'
 },
 sectionHeader2: {
   flex: 1,
   fontSize: 15,
   fontWeight: '600',
   alignItems: 'center',
   backgroundColor: 'rgb(71, 77, 84)',
   color: 'white',
   padding: 10,
 },
})

export default withMappedNavigationProps()(ArtisanDetail)