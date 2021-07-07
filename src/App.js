import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import Routes from './common/routes';
import createStore from './common/store';

const { store, persistor } = createStore();

const App = () => (
  <View style={{ flex: 1, backgroundColor: '#fff' }}>
    <StatusBar barStyle="dark-content" backgroundColor="#f2f2f2" />
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
          <Routes />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  </View>
);

export default App;
