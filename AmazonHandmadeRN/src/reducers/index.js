import { combineReducers } from 'redux';

// Import individual module's reducers here
import Errs from './Errs'
import User from './User'
import Artisans from './Artisans'

//Then combine them all here
const rootReducer = combineReducers({ User, Errs, Artisans });

export default rootReducer;
