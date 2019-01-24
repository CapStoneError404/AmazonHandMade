import React from 'react'
import { AppRegistry } from 'react-native'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'

import { store, persistor } from './src/store'

import App from './src/App';

// Pass the store into the Provider
const AppWithStore = () => (
  <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
         <App />
      </PersistGate>
  </Provider>
)

AppRegistry.registerComponent('AmazonHandmadeRN', () => AppWithStore)
