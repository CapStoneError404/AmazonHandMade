import { AsyncButton, UserInput, Wallpaper } from '@components'
import React, { Component } from 'react'
import { StyleSheet, View } from 'react-native'
import { withMappedNavigationParams } from 'react-navigation-props-mapper'

class LogSale extends Component {
  static navigationOptions = () => {
    return {
      title: 'Log Sale'
    }
  }

  constructor(props) {
    super(props)

    console.log(this.props)

    this.state = {
      logging: false,
      quantity: "",
      focusedInputs: {amount: false, desc: false}
    }

    this.logSale = this.logSale.bind(this)
  }

  logSale() {
    if(!Number.isInteger(this.state.quantity) && parseInt(this.state.quantity) <= 0) {
      this.props.displayError("Please eneter a whole positive, non-zero number.")
      return
    }

    this.setState({logging: true})
    this.props.logSale({
      productId: this.props.productId,
      quantity: parseInt(this.state.quantity)
    }).then((totalSales) => {
      this.setState({logging: false})
      this.props.navigation.goBack()
    }).catch(error => {
      this.props.displayError(error)
    })
  }

  render() {
    return (
      <Wallpaper>
        <View style={styles.container}>
          <UserInput
            placeholder="How Many Items Sold?"
            value={this.state.quantity}
            onChangeText={(newText) => this.setState({quantity: newText})}
            style={styles.smallInput1}
            keyboardType="numeric"
          />
          <AsyncButton 
            title="Log"
            color="#c14700"
            textColor="white"
            onPress={this.logSale}
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
  button: {
    flex: 0,
    borderRadius: 5, 
    flexDirection: 'column',
    height: 75
  }
})

export default withMappedNavigationParams()(LogSale)