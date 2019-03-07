import React, { Component } from 'react'
import {
  Wallpaper,
  AsyncButton,
  CardSection,
  StandardCard
} from '@components'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { withMappedNavigationProps } from 'react-navigation-props-mapper'

class ArtisanPayout extends Component {
  static navigationOptions = () => {
    return {
      title: 'Artisan Payout'
    }

  }

  constructor(props) {
    super(props)

    this.artisanPayoutButtons = [
      {
        title: 'View All',
        onPress: () => console.log("button pressed")
      },
      {
        title: 'Stats',
        onPress: () => console.log("button pressed")
      }
    ]

    console.log(this.props)

    this.state = {
      fetchingPayouts: false
    }

    this.fetchPayouts = this.fetchPayouts.bind(this)
    this.renderRecentPayout = this.renderRecentPayout.bind(this)
    this.navigateToLogPayout = this.navigateToLogPayout.bind(this)
    this.renderRecentPayouts = this.renderRecentPayouts.bind(this)
  }

  componentDidMount() {
    this.fetchPayouts()
  }

  fetchPayouts() {
    this.setState({fetchPayouts: true})
    this.props.fetchPayouts(this.props.User.uid).then(() => {
      this.setState({fetchPayouts: false})
    })
  }

  navigateToLogPayout() {
    this.props.navigation.navigate('LogPayout', {
      uid: this.props.uid
    })
  }

  renderRecentPayout(payout, index) {
    return (
      <View key={index} style={styles.recentPayoutCell}>
        <Text style={styles.payoutText}>{(new Date(payout.date)).toLocaleDateString()}</Text>
        <Text style={styles.payoutText}>{payout.amount}</Text>
      </View>
    )
  }

  renderRecentPayouts() {
    var recentPayouts = this.props.Payouts.filter(payout => {
      return payout.artisanId === this.props.uid
    })

    recentPayouts.sort((first, second) => {
      return first.date <= second.date
    })

    return recentPayouts.slice(0, 6).map((payout, index) => this.renderRecentPayout(payout, index))
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <StandardCard
            title="Recent Payouts"
            buttonsArray={this.artisanPayoutButtons}
          >
            <View style={styles.recentPayouts}>
              {this.renderRecentPayouts()}
            </View>
          </StandardCard>
          <AsyncButton
            title="Log Payout"
            color="green"
            textColor="white"
            onPress={this.navigateToLogPayout}
            style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}
          />
        </ScrollView>
      </Wallpaper>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  image: {
    borderRadius: 5
  },
  firstSection: {
    width: '100%',
    height: 100,
    flexDirection: 'row'
  },
  secondSection: {
    width: '100%',
    flexDirection: 'column',
    flex: 4
  },
  namePhone: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  smallInput1: {
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 4,
    marginRight: 0,
    borderRadius: 5
  },
  smallInput2: {
    marginTop: 2,
    marginBottom: 0,
    marginLeft: 4,
    marginRight: 0,
    borderRadius: 5
  },
  largeInputs: {
    marginTop: 4,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
  },
  button: {
    borderRadius: 5,
    flexDirection: 'column'
  },
  recentPayouts: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch'
  },
  recentPayoutCell: {
    margin: 10,
    height: 25,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  payoutText: {
    fontSize: 14,
    color: 'black'
  }
})

export default withMappedNavigationProps()(ArtisanPayout)