import React, { Component } from 'react'
import { 
  View, 
  Text, 
  StyleSheet, 
  LayoutAnimation 
} from 'react-native'
import { 
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
      if(buttonsArray) {
        return (
          <View style={styles.buttonCardSectionStyle}>
            {buttonsArray.map((item, key) => {
              return this.renderButton(item, key)
            })
            }
          </View>
        )
      }
      
      return null
    }
  }

  iconButtonPressed() {
    this.setState({ buttonsExpanded: !this.state.buttonsExpanded })
  }

  render() {
    const { title } = this.props
    return (
      <View style={[styles.containerStyle, this.props.style]}>
        <View style={styles.headerStyle}>
          <Text style={styles.headerText}>{title}</Text>
          <Icon
            name="dots-vertical"
            size={30}
            color="orange"
            type="material-community"
            underlayColor={'rgb(71, 77, 84)'}
            onPress={this.iconButtonPressed}
          />
        </View>
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
    })
  )
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { 
      width: 0, 
      height: 2 
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    margin: 10,
    backgroundColor: 'white'
  },
  headerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    position: 'relative'
  },
  headerText: {
    fontSize: 20,
    color: '#555555',
    marginLeft: 5,
    fontWeight: 'bold'
  },
  buttonCardSectionStyle: {
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative',
    borderTopWidth: 1
  },
  buttonStyle: {
    height: 25,
    width: 5,
    paddingHorizontal: 10
  }
})