import Translate, { Button, Wallpaper } from '@components'
import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, Picker, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import I18n, {setLocale} from "../../utils/i18n"

export default class Settings extends Component {  
  constructor(props) {
    super(props)

    this.logout = this.logout.bind(this)
    this.changeLanguage = this.changeLanguage.bind(this)
  }

  logout() {
    this.props.authLogout().then(() => {
      this.props.navigation.navigate("Login")
    })
  }
  
  changeLanguage(lang) {
    setLocale(lang)
    this.props.changeLanguage(lang)
  }

  render() {
    const lang = this.props.Settings.language
    
    return (
      <Wallpaper style={styles.container}>
        <View style={styles.textContainer}>
          <ScrollView>
            {/* <Translate style={styles.text} transString="Settings.settingsTitle" /> */}
            <Text style={styles.text}>{I18n.t("Settings.settingsTitle", {locale: lang})}</Text>
          </ScrollView>
        </View>
        
        <Text>{I18n.t("Settings.choseLanguage", {locale: lang})}:</Text>
        <View style={styles.categorySection}>
          <Picker
            itemStyle={styles.PickerItem}
            selectedValue={this.props.Settings.language}
            testID="languagePicker"
            onValueChange={(itemValue) => this.changeLanguage(itemValue)}>
            <Picker.Item label="English" value="en" />
            <Picker.Item label="Spanish" value="es" />
            <Picker.Item label="French" value="fr" />
          </Picker>
        </View>
        
        <Button
          testID='logout_button'
          style={styles.button}
          title={I18n.t("Settings.returnToLogin", {locale: lang})}
          color="#c14700"
          textColor="white"
          onPress={this.logout}
        />
      </Wallpaper>
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
  categorySection: Platform.OS === 'ios' ? {
    alignSelf: 'center',
    width: '90%',
    color: '#808080',
    backgroundColor: 'white',
    margin: '4%',
    borderRadius: 10,
    height: 200
  } : {
    alignSelf: 'center',
    width: '90%',
    color: '#808080',
    backgroundColor: 'white',
    margin: '4%',
    borderRadius: 10,
    height: 60
  },
  PickerItem: Platform.OS === 'ios' ? {
    height: 200,
    color: 'black'
  } : {
    height: 60,
    color: 'black'
  },
  text: {
    color: 'white',
    fontSize: 30
  },
  button: {
    flex: 1
  }
})