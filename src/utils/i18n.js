import I18n from "i18n-js"
import * as RNLocalize from "react-native-localize"

import en from "./en"
import es from "./es"
import fr from "./fr"

const locales = RNLocalize.getLocales()

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag
  //console.log("THE LOCAL IS: " + I18n.locale)
}

I18n.fallbacks = true;
I18n.translations = {
  en,
  es,
  fr
}

export const setLocale = (locale) => {
  I18n.locale = locale
};

export default I18n