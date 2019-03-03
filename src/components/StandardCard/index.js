import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  LayoutAnimation 
} from 'react-native'
import { 
  CardSection, 
  Button 
} from '@components'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'

export default class StandardCard extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buttonsExpanded: true,
    }

    this.renderButton = this.renderButton.bind(this)
    this.showButtons = this.showButtons.bind(this)
    this.iconButtonPressed = this.iconButtonPressed.bind(this)
  }

  componentDidUpdate() {
    LayoutAnimation.easeInEaseOut()
  }

  renderButton(buttonObject, key) {
    const { title, onPress } = buttonObject
    return (
      <Button
        key={key}
        style={styles.buttonStyle}
        title={title}
        textColor="orange"
        onPress={onPress}
      />
    )
  }

  showButtons() {
    const { buttonsArray } = this.props
    
    if (this.state.buttonsExpanded) {
      return (
        <CardSection style={styles.buttonCardSectionStyle}>
          {buttonsArray ? buttonsArray.map((item, key) => {
            return this.renderButton(item, key)
          }) : 
            () => {throw new Error("Cannot map through empty array")}
          }
        </CardSection>
      )
    }
  }

  iconButtonPressed() {
    this.setState({ buttonsExpanded: !this.state.buttonsExpanded })
  }

  render() {
    const { title } = this.props
    return (
      <View style={[styles.containerStyle, this.props.style]}>
        <CardSection
          style={{
            backgroundColor: 'rgb(71, 77, 84)',
            justifyContent: 'space-between'
          }}
        >
          <Text style={styles.headerText}>{title}</Text>
          <Icon
            name="dots-vertical"
            size={30}
            color="orange"
            type="material-community"
            underlayColor={'rgb(71, 77, 84)'}
            onPress={this.iconButtonPressed}
          />
        </CardSection>

        {this.props.children}
        {this.showButtons()}

      </View>
    )
  }  
}

StandardCard.propTypes = {
  title: PropTypes.string.isRequired,
  buttonsArray: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      onPress: PropTypes.func.isRequired,
    })).isRequired,
}

const styles = StyleSheet.create({
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10
  },
  headerText: {
    fontSize: 20,
    color: 'white',
    marginLeft: 5
  },
  buttonCardSectionStyle: {
    backgroundColor: 'white',
  },
  buttonStyle: {
    height: 25,
    width: 5,
    backgroundColor: 'white',
    paddingHorizontal: 10
  }
})