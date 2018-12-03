export default function ArtisanHub(state = [], action) {
  console.log("ArtisanHub reducing action " + action.type);
  switch (action.type) {
    case 'ADD_ARTISAN':
      return action.artisan
    default:
      return state;
  }
}