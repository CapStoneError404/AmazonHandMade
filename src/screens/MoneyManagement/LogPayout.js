import { AsyncButton, UserInput, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

class LogPayout extends Component {
  static navigationOptions = () => {
    return {
      title: 'Log Payout'
    }
  }

  constructor(props) {
    super(props)

    this.state = {
      amount: "",
      description: "",
      logging: false,
    }

    this.logPayout = this.logPayout.bind(this)
  }

  logPayout() {
    this.setState({logging: true})
    this.props.logPayout({
      cgaId: this.props.User.uid,
      artisanId: this.props.uid,
      amount: this.state.amount,
      description: this.state.description
    }).then(() => {
      this.setState({logging: false})
      this.props.navigation.goBack()
    })
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <View style={styles.container}>
          <UserInput
            iconName="dollar"
            placeholder="How Much?"
            value={this.state.amount}
            onChangeText={(newText) => this.setState({amount: newText})}
            style={styles.smallInput1}
          />
          <UserInput 
            placeholder="For What?"
            value={this.state.description}
            onChangeText={(newText) => this.setState({description: newText})}
            style={styles.largeInputs}
            multiline={true}
          />
          <AsyncButton 
            title="Log"
            color="#c14700"
            textColor="white"
            onPress={this.logPayout}
            style={styles.button}
            spinning={this.state.logging}
          />
        </View>
      </Wallpaper>
    )
  }
}
  
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 10
  },
  smallInput1: {
    flex: 0,
    borderRadius: 5,
    height: 75
  },
  largeInputs: {
    flex: 0,
    height: 150,
    borderRadius: 5,
  },
  button: {
    flex: 0,
    borderRadius: 5, 
    flexDirection: 'column',
    height: 75
  }
})

export default withMappedNavigationParams()(LogPayout)