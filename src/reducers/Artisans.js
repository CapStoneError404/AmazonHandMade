export default function Artisans(state = [], action) {
  console.log("Artisans reducing action " + action.type);
  //console.log("artisan passed through reducer: " + action.artisan);
  console.log("current state: " + state);
  switch (action.type) {
    case 'ADD_ARTISAN':
      return state.concat([action.artisan])
    case 'GET_ARTISANS':
      return action.artisans
    case 'DELETE_ARTISAN':
      return action.payload
    default:
      return state;
  }
}