import * as RNLocalize from "react-native-localize"

const initLanguage = RNLocalize.getLocales()

export default function Settings(state = {language: initLanguage}, action) {
  console.log("Settings reducing action " + action.type)
  switch (action.type) {
    case 'SET_LANGUAGE':
      return Object.assign({}, state, {
          language: action.language
      })
    default:
      return state
  }
}