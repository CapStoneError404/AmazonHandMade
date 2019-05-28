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
      this.props.navigation.state.params.ProductDetailScreen.setState({numSales: totalSales})
      this.props.navigation.goBack()
    }).catch(error => {
      this.props.displayError(error)
    })
  }

  render() {
    return (
      <Wallpaper style={styles.container}>
        <View style={styles.container}>
          <View style={this.state.focusedInputs.quantity? [styles.focusedInput, styles.inputWrapper] :styles.inputWrapper}>
            <UserInput
              placeholder="How Many Items Sold?"
              value={this.state.quantity}
              onChangeText={(newText) => this.setState({quantity: newText})}
              onFocus={()=> this.setState({focusedInputs: {...this.state.focusedInputs, quantity: true}})}
              onBlur={()=> this.setState({focusedInputs: {...this.state.focusedInputs, quantity: false}})}
              style={styles.smallInput1}
              keyboardType="numeric"
            />
          </View>
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
    padding: 5,
    flex: 0
  },
  smallInput1: {
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 5,
    height: 75
  },
  largeInputs: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
    height: 200,
  },
  button: {
    borderRadius: 5, 
    flexDirection: 'column',
    height: 75
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 5
  },
  inputWrapper: {
    marginVertical: 10,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 5
  }
})

export default withMappedNavigationParams()(LogSale)