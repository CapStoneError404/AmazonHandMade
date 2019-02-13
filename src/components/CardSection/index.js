import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
//the brackets sytanx we used here says use containerStyle, but if anything gets
//passed in props for style we want to say override anything that gets passed
//In this case we pass in a different flexDirection so it will override the container styles flexDirection
// const CardSection = (props) => {
//   return (
//     <View style={[ styles.containerStyle, props.style ]}>
//       {props.children}
//     </View>
//   );
// };

export default class CardSection extends Component {
   render() {
      return (
        <View style={[ styles.containerStyle, this.props.style ]}>
          {this.props.children}
        </View>
      )
   }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
});

//export { CardSection };