import React from 'react';
import {  Button } from '@components';
import { View, Text, Modal, StyleSheet } from 'react-native';


//What do we need to give this functional component
//passing in props to give the user more control and giving this component great
//reusability
const Confirm = ({ children, onAccept, onDecline, visible }) => {
   const { cardSectionStyle, textStyle, containerStyle } = styles;

   return (
      //modal is a big wrapper
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

            <View>
               <Button onPress={onAccept} title="Yes">Yes</Button>
               <Button onPress={onDecline} title="No">No</Button>
            </View>
         </View>
      </Modal>
   );
};

//lineHeight gives a little bit of spacing when having to wrap around the page
// rgba-the a is the opacity of the background
//flex 1 says take up whole screen
const styles = StyleSheet.create({
   cardSectionStyle: {
      justifyContent: 'center'
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
   }
});

export default Confirm;

