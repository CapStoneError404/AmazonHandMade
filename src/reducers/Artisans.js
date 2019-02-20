export default function Artisans(state = [], action) {
  
  switch (action.type) {
    case 'ADD_ARTISAN':
      return state.concat([action.artisan])
    case 'GET_ARTISANS':
      return action.artisans
    case 'DELETE_ARTISAN':
      return state.filter(artisan => artisan.uid !== action.artisanId)
    case 'SAVE_ARTISAN':
      return state.map((item) => {
         if(item.uid !== action.artisan.uid) {
            return item;
         }

         return {
            ...item,
            ...action.artisan
         }
      })
    default:
      return state;
  }
}