import React from 'react';
import PropTypes from 'prop-types';
import {  Button, AsyncButton } from '@components';
import { View, Text, Modal, StyleSheet } from 'react-native';

const Confirm = ({ children, onAccept, onDecline, visible, spinning }) => {
  const { cardSectionStyle, textStyle, containerStyle, buttonContainerStyle, buttonStyle } = styles;
   
   return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <View style={cardSectionStyle}>
          <Text style={textStyle}>{ children }</Text>
        </View>

        <View style={buttonContainerStyle}>
          <AsyncButton 
            style={buttonStyle}
            onPress={onAccept} 
            title="Yes"
            textColor="red"
            color="white"
            spinning={spinning}
          />
          <Button 
            style={buttonStyle}
            onPress={onDecline} 
            title='No'
            textColor="red"
          />
        </View>
      </View>
    </Modal>
  );
};

Confirm.propTypes = {
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  spinning: PropTypes.bool,
  
};

const styles = StyleSheet.create({
  cardSectionStyle: {
    justifyContent: 'center',
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  },
  buttonContainerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  },
  buttonStyle: {
    flexDirection: 'column',
    flex: 1,
    alignSelf: 'stretch',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5 
  }
});

export default Confirm;


