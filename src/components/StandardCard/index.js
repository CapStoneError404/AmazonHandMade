import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CardSection, Button } from '@components'
import PropTypes from 'prop-types'
import { Icon } from 'react-native-elements'


export default class StandardCard extends Component {
  constructor(props) {
    super(props)

    this.renderButtons = this.renderButtons.bind(this)
  }

  renderButtons(buttonObject) {
    const { title, onPress } = buttonObject
    return (
      <Button
        style={styles.buttonStyle}
        title={title}
        textColor="orange"
        onPress={onPress}
      />
    )
  }

  render() {
    const { title, iconOnPress, buttonsArray } = this.props
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
            onPress={iconOnPress}
          />
        </CardSection>

        {this.props.children}

        <CardSection style={styles.buttonCardSectionStyle}>
          {buttonsArray.map((item) => {
            renderButtons(item)
          })}
        </CardSection>
      </View>
    )
  }  
}


// const THREE_BUTTONS = function(props, propName) {
//   if (!Array.isArray(props.THREE_BUTTONS) || props.THREE_BUTTONS.length > 3 || !props.THREE_BUTTONS.every()) {
//     return new Error(`${propName} needs to be an array of at least button and no greater than 3`)
//   }
//   return null
// }

StandardCard.propTypes = {
  title: PropTypes.string.isRequired,
  iconOnPress: PropTypes.func.isRequired,
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
    backgroundColor: 'white'
  },
  buttonStyle: {
    height: 20, backgroundColor: 'white'
  }
})