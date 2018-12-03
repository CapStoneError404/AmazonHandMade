export default function Artisans(state = [], action) {
  console.log("Artisans reducing action " + action.type);
  switch (action.type) {
    case 'ADD_ARTISAN':
      state.push(action.artisan)
      return state
    case 'GET_ARTISANS':
      return action.artisans
    default:
      return state;
  }
}