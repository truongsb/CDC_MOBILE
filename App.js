import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import rootReducer from './src/redux/store'
import Main123 from './src/view/Main';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const store = createStore(rootReducer);
export default function App() {
  return (
    <Provider store ={store}>
      <SafeAreaProvider>
        <Main123></Main123>
      </SafeAreaProvider>
    </Provider>


  );
}

