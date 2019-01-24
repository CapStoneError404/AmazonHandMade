import { Button } from '@components';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


export default class Settings extends Component {
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
  }

  logout() {
    this.props.authLogout().then(() => {
      this.props.navigation.navigate("Login")
    })
  }

  render() {
    return (
      <LinearGradient colors={['#AAAAAA', '#AAAAAA']} style={styles.container}>
        <View style={styles.textContainer}>
          <ScrollView>
            <Text style={styles.text}>{"Settings"}</Text>
          </ScrollView>
        </View>
        <Button
          testID='logout_button'
          style={styles.button}
          title="Return to Login"
          color="#c14700"
          textColor="white"
          onPress={this.logout}
        />
      </LinearGradient>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  textContainer: {
    flex: 8,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 20
  },
  button: {
    flex: 1
  }
})