import { Wallpaper } from '@components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ProfilePicture } from '../../components'

export default class ArtisanList extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showAddArtisan: false,
      fetchingArtisans: false
    }

    this.fetchArtisans = this.fetchArtisans.bind(this)
    this.sortedArtisans = this.sortedArtisans.bind(this)
  }

  componentDidMount() {
    this.fetchArtisans()
  }

  fetchArtisans() {
    this.setState({fetchingArtisans: true})
    this.props.fetchArtisans(this.props.user.uid).then(() => {
      this.setState({fetchingArtisans: false})
    })
  }

  _keyExtractor = (item) => item.uid

  sortedArtisans() {
    if(this.props.artisans != []) {
      sortedArtisans = Array.from(this.props.artisans)
      sortedArtisans.sort((first, second) => {
        name1 = first.name.toLowerCase()
        name2 = second.name.toLowerCase()
        if (name1 < name2)
          return -1
        else if(name1 > name2)
          return 1
        else
          return 0
      })
      return sortedArtisans
    } else {
      return []
    }
  }

  render() {
    return (
      <Wallpaper>
        {(this.props.artisans != [] && this.state.fetchingArtisans) ?
          <ActivityIndicator 
            size='large'
            animating={this.state.fetchingArtisans}
            color='white'
          />
          :
          <FlatList
            testID='artisan_list'
            data={this.sortedArtisans()}
            keyExtractor={this._keyExtractor}
            renderItem={this.props.renderArtisanItem}
            extraData={this.state}
          />
        }
      </Wallpaper>
    )
  }
}

ArtisanList.propTypes = {
  user: PropTypes.object,
  artisans: PropTypes.array,
  renderArtisanItem: PropTypes.function
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
  }
})
