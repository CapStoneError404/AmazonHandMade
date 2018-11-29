export default function Errs(state = [], action) {
  console.log("Errs reducing action " + action.type);
  switch (action.type) {
    case 'ERROR':
      return [action.error.message]
    case 'CLEAR_ERRS':
      return [];
    default:
      return state;
  }
}