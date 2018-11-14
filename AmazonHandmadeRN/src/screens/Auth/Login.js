import React, { Component } from 'react';
import {
   StyleSheet,
   Text,
   View,
   KeyboardAvoidingView,
   TouchableOpacity
} from 'react-native';

import {
   AsyncButton,
   UserInput,
   Button,
   Divider,
   Wallpaper
} from '@components'

export default class Login extends Component {
   constructor(props) {
      super(props)

      console.log("Props: ")
      console.log(this.props)

      this.state = {
         email: "",
         password: ""
      }

      this.handleEmailChange = this.handleEmailChange.bind(this)
      this.handlePasswordChange = this.handlePasswordChange.bind(this)
      this.submit = this.submit.bind(this)
      this.createAccount = this.createAccount.bind(this)
      this.forgotPassword = this.forgotPassword.bind(this)
   }

   submit() {
      this.props.emailLogin(this.state.email, this.state.password)
   }

   createAccount() {
      this.props.navigation.navigate('Register')
   }

   forgotPassword() {
      this.props.navigation.navigate('ForgotPassword')
   }

   handleEmailChange(newText) {
      this.setState({ email: newText })
   }

   handlePasswordChange(newText) {
      this.setState({ password: newText })
   }

   render() {
      return (
         <Wallpaper>
            <Text style={styles.logo}>Handmade</Text>
            <KeyboardAvoidingView style={styles.email}>
               <UserInput
                  iconName="envelope"
                  placeholder="Email"
                  value={this.state.email}
                  onChangeText={this.handleEmailChange}
               />
               <UserInput
                  iconName="key"
                  placeholder="Password"
                  value={this.state.password}
                  onChangeText={this.handlePasswordChange}
                  secureTextEntry={true}
               />
               <AsyncButton
                  title="Submit"
                  color="#c14700"
                  textColor="white"
                  onPress={this.submit}
               />
               <View style={styles.createForgot}>
                  <TouchableOpacity
                     onPress={this.createAccount}>
                     <Text style={styles.createForgotText}>Create Account</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     onPress={this.forgotPassword}>
                     <Text style={styles.createForgotText}>Forgot Password?</Text>
                  </TouchableOpacity>
               </View>
            </KeyboardAvoidingView>
         </Wallpaper>
      )
   }
}

const styles = StyleSheet.create({
   logo: {
      flex: 3,
      textAlign: 'center',
      fontSize: 60,
      color: 'white',
      marginTop: 60
   },
   email: {
      flex: 2,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
   },
   createForgot: {
      flex: 0,
      width: '95%',
      height: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center'
   },
   socialDiv: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20
   },
   divText: {
      color: '#444444',
      fontWeight: 'bold'
   },
   createForgotText: {
      color: 'white',
      fontSize: 15
   }
})