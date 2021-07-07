import 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import React from 'react';
import { StatusBar } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Routes from './common/routes';
import createStore from './common/store';

enableScreens();

const { store, persistor } = createStore();

const App = () => (
  <>
    <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  </>
);

export default App;
