import { Wallpaper } from '@components'
import React, { Component } from 'react'
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  RefreshControl
} from 'react-native'
import { ProfilePicture } from '../../components'


export default class ArtisanList extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Artisans',
      headerRight: (
        <View style={Platform.OS === 'ios' ? { paddingRight: 0 } : { paddingRight: 20 }}>
          <Button
            transparent
            onPress={() => navigation.navigate("AddArtisan")}
            title="Add"
          />
        </View>
      )
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      showAddArtisan: false,
      fetchingArtisans: false,
      name: " ",
      text: "",
      artisans: this.sortedArtisans()
    }

    this.fetchArtisans = this.fetchArtisans.bind(this)
    this.navigateToArtisan = this.navigateToArtisan.bind(this)
    this.sortedArtisans = this.sortedArtisans.bind(this)
    this.searchFilterFunction = this.searchFilterFunction.bind(this)
    
  }

  componentDidMount() {
    this.fetchArtisans()
  }

  // componentDidUpdate(prevProps){
  //   console.log("prevProps: " + JSON.stringify(prevProps))
  //   if ( prevProps.Artisans !== this.props.Artisans ) {
  //     this.searchFilterFunction() //This will take care of updating artisans state
  //   }
  // }
  
  componentWillReceiveProps(nextProps) {
    if (nextProps.Artisans != null){
      console.log("nextProps: " + JSON.stringify(nextProps))
      this.searchFilterFunction()
    }
  }

  fetchArtisans() {
    this.setState({ fetchingArtisans: true })
    this.props.fetchArtisans(this.props.User.uid).then(() => {
      this.setState({ 
        fetchingArtisans: false,
        artisans: this.sortedArtisans()
      })
    })
  }

  navigateToArtisan(artisan) {
    this.props.navigation.navigate('ArtisanDetail', { ...artisan })
  }

  _renderArtisanItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        testID={`listItem${index}`}
        style={styles.artisanView}
        onPress={() => this.navigateToArtisan(item)}
        key={item.key}
      >
        <ProfilePicture
          source={{ uri: item.profilePictureURL }}
          style={styles.image}
        />
        <View style={styles.namePhone}>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={styles.text}>{item.location}</Text>
          <Text style={styles.text}>{item.phoneNumber}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  _keyExtractor = (item) => item.uid

  sortedArtisans() {
    if (this.props.Artisans != []) {
      sortedArtisans = Array.from(this.props.Artisans)
      sortedArtisans.sort((first, second) => {
        name1 = first.name.toLowerCase()
        name2 = second.name.toLowerCase()
        if (name1 < name2)
          return -1
        else if (name1 > name2)
          return 1
        else
          return 0
      })
      return sortedArtisans
    } else {
      return []
    }
  }

  searchFilterFunction() {
    if (!this.state.text) {
      this.setState({ artisans: this.sortedArtisans() })
    }
    else {
      const newData = this.props.Artisans.filter((item) => {
        const name = item.name.toLowerCase()
        const textData = this.state.text.toLowerCase()
        return name.indexOf(textData) !== -1
      })
      
      this.setState({
        artisans: newData // after filter we are setting users to new array
      })
    }
  }

  
  render() {
    return (
      <Wallpaper>
        <TextInput
          style={styles.input}
          value={this.state.text}
          onChangeText={(newText) => this.setState({ text: newText }, this.searchFilterFunction)}
          underlineColorAndroid="transparent"
          placeholder="Search Artisan"
        />
        {(this.props.Artisans != [] && this.state.fetchingArtisans) ?
          <ActivityIndicator
            size='large'
            animating={this.props.spinning}
            color='white'
          />
          :
          <FlatList
            testID='artisan_list'
            data={this.state.artisans}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderArtisanItem}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.fetchingArtisans}
                onRefresh={this.fetchArtisans}
              />
            }
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
  artisanView: {
    height: 100,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10
  },
  namePhone: {
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
  },
  submitButton: {
    backgroundColor: '#7a42f4',
    padding: 10,
    margin: 15,
    height: 40,
  },
  submitButtonText: {
    color: 'white'
  }
})
