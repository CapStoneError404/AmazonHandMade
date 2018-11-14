import React, { Component } from 'react';
import {
   Platform,
   StyleSheet,
   Text,
   View,
   KeyboardAvoidingView,
   TouchableOpacity
} from 'react-native';

import { Button } from '@components'

export default class Home extends Component {
   constructor(props) {
      super(props)

      this.logout = this.logout.bind(this)
   }

   logout() {
      this.props.authLogout()
   }

   render() {
      return (
         <View style={styles.container}>
            <Text>Hello</Text>
            <Button
               title="Logout"
               onPress={this.logout}
            />
         </View>
      )
   }
}

const styles = StyleSheet.create({
   container: {
      flex: 1
   }
})