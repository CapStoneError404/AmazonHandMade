export default function Artisans(state = [], action) {
  console.log("Artisans reducing action " + action.type)
  switch (action.type) {
    case 'ADD_ARTISAN':
      return state.concat([action.artisan])
    case 'GET_ARTISANS':
      return action.artisans
    case 'DELETE_ARTISAN':
      return state.filter(artisan => artisan.uid !== action.artisanId)
    default:
      return state;
  }
}