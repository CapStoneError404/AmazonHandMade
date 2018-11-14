export default function User(state = [], action) {
   console.log("User reducing action " + action.type);
   switch (action.type) {
      case 'LOGIN':
         return action.user
      case 'LOGOUT':
         return null
      default:
         return state;
   }
}