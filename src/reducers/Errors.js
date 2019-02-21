export default function Errors(state = [], action) {
  console.log("Errors reducing action " + action.type)
  switch (action.type) {
  case 'ERROR':
    return [action.error.message]
  case 'CLEAR_ERRORS':
    return []
  default:
    return state
  }
}