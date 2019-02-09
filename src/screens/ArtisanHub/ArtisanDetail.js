import { ProfilePicture, Wallpaper, AsyncButton} from '@components';
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

//   componentDidMount() {
//    const setParamsAction = NavigationActions.setParams({
//       params: { showTabBar: false },
//       key: this.props.navigation.state.key,
//     });
//     this.props.navigation.dispatch(setParamsAction);
//   }

  constructor(props) {
    super(props)

    this.state = {
       showModel: false,
       adding: false
    }

    this.onCancel = this.onCancel.bind(this);
    this.deletePressed = this.deletePressed.bind(this);
    this.showAlert = this.showAlert.bind(this);
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

  render() {
    const images = [
       { url: 'https://i.pinimg.com/originals/87/2c/83/872c83322f27c9527a255149b03d4dfe.jpg'},
       { url: 'https://images-na.ssl-images-amazon.com/images/I/51jzNmEmiIL._AC_US400_QL65_.jpg'},
       { url: 'https://images-na.ssl-images-amazon.com/images/I/51svf2meabL._AC_US400_QL65_.jpg'},
       { url: 'https://images-na.ssl-images-amazon.com/images/I/417u2WxNYZL._AC_US400_QL65_.jpg'},
       { url: 'https://images-na.ssl-images-amazon.com/images/I/51nXE7AcuYL._AC_US400_QL65_.jpg'},
       { url: 'https://m.media-amazon.com/images/I/71DSpZ0ZQbL._AC_UL640_QL65_.jpg'},
    ]
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <View style={styles.firstSection}>
            <ProfilePicture 
              source={{uri: this.props.profilePictureURL}}
              style={styles.image}
            />
            <View style={styles.namePhone}>
              <Text style={styles.text}>{this.props.name}</Text>
              <Text style={styles.text}>{this.props.phoneNumber}</Text>
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.text}>{this.props.description}</Text>
          </View>
          {/* <View>
             <Text>Products</Text>
          </View> */}
            <SectionGrid
               //horizontal={true}
               itemDimension={110}
               //items={images}
               // staticDimension={300}
               // fixed
               //spacing={20}
               sections={[
                  {
                    title: 'Products',
                    data: images.slice(0, 12),
                  }
                ]}

               //  renderSectionHeader={({ section }) => (
               //    <Text style={styles.sectionHeader}>{section.title}</Text>
               // )}
               style={styles.gridView}
               renderItem={({ item, section, index }) => {
                  
                  console.log(item);
                  return (
                     <TouchableOpacity style={styles.itemContainer}>
                        <Image style={styles.itemContainer} source={{uri: item.url} }/>
                     </TouchableOpacity>
                  )
               }}
               
            />
        </ScrollView>
        
            <ActionButton buttonColor='orange' verticalOrientation='up' position='left' spacing={10} style={{ flex: 0.2}} >
               <ActionButton.Item buttonColor='red' title="Delete Artisan" onPress={this.showAlert}>
                 <Icon name="user-minus" style={styles.actionButtonIcon} />
               </ActionButton.Item>
               <ActionButton.Item buttonColor='green' title="Add Product" onPress={this.showAlert}>
                 <Icon name="plus" style={styles.actionButtonIcon} />
               </ActionButton.Item>
               <ActionButton.Item buttonColor='blue' title="View Product List" onPress={() => console.log('navigate to product list page')}>
                 <Icon name="list-ul" style={styles.actionButtonIcon} />
               </ActionButton.Item>
            </ActionButton>
         
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
    height: 90,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    margin: 5
  },
  firstSection: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  description: {
    flex: 3,
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: 5,
    margin: 10,
    padding: 10
  },
  text: {
    fontSize: 20,
    color: '#444444',
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
   height: 110,
   width: 110
 },
 sectionHeader: {
   flex: 1,
   fontSize: 15,
   fontWeight: '600',
   alignItems: 'center',
   backgroundColor: 'rgba(250, 250, 250, 0.2)',
   color: 'black',
   padding: 10,
 },
})

export default withMappedNavigationProps()(ArtisanDetail)