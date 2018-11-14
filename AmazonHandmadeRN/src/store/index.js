/* eslint-disable global-require */
/* eslint-disable no-undef */
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from '../reducers';

let middleware = [thunk];

if (__DEV__) {
	const reduxImmutableStateInvariant = require('redux-immutable-state-invariant').default();
	middleware = [...middleware, reduxImmutableStateInvariant, logger];
} else {
	middleware = [...middleware];
}

const persistConfig = {
   key: 'root',
   storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(
   persistedReducer,
   applyMiddleware(...middleware)
)

let persistor = persistStore(store)

if (module.hot) {
   module.hot.accept(() => {
      // This fetch the new state of the above reducers.
      const nextRootReducer = require('../reducers')
      store.replaceReducer(
         persistReducer(persistConfig, nextRootReducer)
      )
   })
}
   
export { store, persistor }

