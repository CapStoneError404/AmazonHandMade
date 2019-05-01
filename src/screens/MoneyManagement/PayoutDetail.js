import React, { Component } from 'react'
import {
  Wallpaper,
  StandardCard
} from '@components'
import {
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import PropTypes from 'prop-types'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

class PayoutDetail extends Component {
  static navigationOptions = () => {
    return {
      title: 'Payout Details'
    }
  }

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <ScrollView style={{ flex: 1.8 }}>
          <StandardCard
            title="Recent Payouts"
          >
            <View style={styles.cardContent}>
              <View style={styles.section}>
                <Text style={styles.titleText}>Date:</Text>
                <Text style={styles.normalText}>{new Date(this.props.date).toString()}</Text>
              </View>
              <View style={styles.section}>
                <Text style={styles.titleText}>Amount:</Text>
                <Text style={styles.normalText}>${this.props.amount}</Text>
              </View>
              <View style={styles.descriptionSection}>
                <Text style={styles.titleText}>Description:</Text>
                <Text style={styles.normalText}>{this.props.description}</Text>
              </View>
            </View>
          </StandardCard>
        </ScrollView>
      </Wallpaper>
    )
  }
}


PayoutDetail.propTypes = {
  date: PropTypes.number,
  amount: PropTypes.number,
  description: PropTypes.string
}

const styles = StyleSheet.create({
  cardContent: {
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  section: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    padding: 10
  },
  descriptionSection: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10
  },
  titleText: {
    fontWeight: 'bold'
  },
  normalText: {

  }
})

export default withMappedNavigationParams()(PayoutDetail)