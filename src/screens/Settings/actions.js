export function changeLanguage(lang) {
  console.log("Changing Language")
  return (dispatch) => {
    return new Promise(async (resolve) => {
      console.log("The new language is: " + lang)
      resolve()
      dispatch({type: 'SET_LANGUAGE', language: lang})
    })
  }
}