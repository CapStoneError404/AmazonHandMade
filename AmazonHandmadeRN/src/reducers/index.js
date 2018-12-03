import { combineReducers } from 'redux';

// Import individual module's reducers here
import Errs from './Errs'
import User from './User'
import ArtisanHub from './ArtisanHub'

//Then combine them all here
const rootReducer = combineReducers({ User, Errs, ArtisanHub });

export default rootReducer;
