import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['medicalRecords'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default initialState => {
  const store = createStore(
    persistedReducer,
    initialState,
    compose(applyMiddleware(thunk)),
  );

  const persistor = persistStore(store);
  return { store, persistor };
};
