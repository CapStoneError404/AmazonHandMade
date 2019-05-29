import React, { Component } from 'react'
import {
  Wallpaper,
  CardSection,
  StandardCard
} from '@components'
import {
  ScrollView,
  StyleSheet,
  Text,
  Linking,
  TouchableOpacity
} from 'react-native'
import { ProfilePicture } from '../../components'
import { View } from 'native-base';
import I18n, {setLocale} from "../../utils/i18n"

export default class ActionCenter extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      title: navigation.getParam('Title', 'Default Title')
    }

  }

  constructor(props) {
    super(props)
    this.state = {

    }
    this.settingsNavButton = [
     /*
     {
       title: 'Edit',
       onPress: () => this.navigateToEditCGA()
     }*/,
      {
        title: I18n.t("ActionCenter.settings", {locale: this.props.Settings.language}),
        onPress: () => this.navigateToSettings()
      }
    ]
    
    this.props.navigation.setParams({Title: I18n.t("ActionCenter.title", {locale: this.props.Settings.language})})
    
    this.navigateToEditCGA = this.navigateToEditCGA.bind(this)
    this.navigateToSettings = this.navigateToSettings.bind(this)
    this.getTotalListings = this.getTotalListings.bind(this)
  }


  getTotalListings() {
    var numArtisans = this.props.Artisans.length
    var totalListings = 0

    for (var i = 0; i < numArtisans; i++) {
      totalListings += Object.keys((this.props.Artisans[i]["products"]) || {}).length
    }
    return totalListings
  }

  navigateToEditCGA() {
    //todo
  }

  navigateToSettings() {
    this.props.navigation.navigate("Settings")
  }

  render() {
    if (this.props.User) {
      return (
        <Wallpaper style={styles.container}>
          <ScrollView style={{ flex: 1.8 }}>
            <StandardCard
              title={I18n.t("ActionCenter.welcome", {locale: this.props.Settings.language})}
              buttonsArray={this.settingsNavButton}
            >
              <CardSection style={styles.cardSection}>
                {/*}
               <ProfilePicture
                source={{uri: this.props.User.photoURL}}
                style={styles.image}
               />*/}
                <Text style={styles.cardText}>{I18n.t("ActionCenter.name", {locale: this.props.Settings.language})}: {this.props.User.displayName} </Text>
                <Text style={styles.cardText}>{I18n.t("ActionCenter.email", {locale: this.props.Settings.language})}: {this.props.User.email}</Text>
              </CardSection>
            </StandardCard>

            <StandardCard
              title={I18n.t("ActionCenter.aboutArtisans", {locale: this.props.Settings.language})}
              buttonsArray={this.transactionButtons}
            >
              <CardSection style={styles.cardSection}>
                <Text style={styles.cardText}>{I18n.t("ActionCenter.numberOf", {locale: this.props.Settings.language})}: {this.props.Artisans.length}</Text>
                <Text style={styles.cardText}>{I18n.t("ActionCenter.totalArtisans", {locale: this.props.Settings.language})}: {this.getTotalListings()}</Text>
              </CardSection>
            </StandardCard>

            <StandardCard
              title={I18n.t("ActionCenter.resources", {locale: this.props.Settings.language})}
            >
              <CardSection style={styles.cardSection}>
                <TouchableOpacity onPress={() => Linking.openURL('https://error404.gitbook.io/project/')}>
                  <Text style={[styles.cardText, styles.linkText]}>{I18n.t("ActionCenter.wiki", {locale: this.props.Settings.language})}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://sellercentral.amazon.com/')}>
                  <Text style={[styles.cardText, styles.linkText]}>{I18n.t("ActionCenter.sellerCentral", {locale: this.props.Settings.language})}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://sellercentral.amazon.com/forums/')}>
                  <Text style={[styles.cardText, styles.linkText]}>{I18n.t("ActionCenter.sellerForum", {locale: this.props.Settings.language})}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Linking.openURL('https://www.amazon.com/ap/signin?openid.return_to=https%3A%2F%2Fwww.amazon.com%2Fhz%2Fcontact-us%3Ffrom%3Dgp%26*entries*%3D0%26_encoding%3DUTF8%26*Version*%3D1&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.assoc_handle=amzn_contactus_desktop_us&openid.mode=checkid_setup&marketPlaceId=ATVPDKIKX0DER&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=Amazon&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.pape.max_auth_age=3600&siteState=clientContext%3D133-3534273-1927417%2CsourceUrl%3Dhttps%253A%252F%252Fwww.amazon.com%252Fhz%252Fcontact-us%253Ffrom%253Dgp%2526*entries*%253D0%2526_encoding%253DUTF8%2526*Version*%253D1%2Csignature%3DroWGPjqxWUoNNtMkFrBDZBSTH0Yj3D')}>
                  <Text style={[styles.cardText, styles.linkText]}>{I18n.t("ActionCenter.contact", {locale: this.props.Settings.language})}</Text>
                </TouchableOpacity>
              </CardSection>
            </StandardCard>
          </ScrollView>
        </Wallpaper>
      )
    }
    else {
      return (<View></View>)
    }
  }
}

const styles = StyleSheet.create({
  image: {
    height: 90,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 45,
    margin: 5
  },
  container: {
    flex: 1
  },
  textContainer: {
    flex: 8,
    marginTop: 10,
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  cardSection: {
    flex: 1,
    flexDirection: 'column'
  },
  text: {
    fontSize: 10,
    color: '#444444',
    marginLeft: 5
  },
  cardText: {
    paddingVertical: 10,
    flex: 1,
    fontSize: 20,
    color: '#444444'
  },
  linkText: {
    color: '#008296'
  }
})