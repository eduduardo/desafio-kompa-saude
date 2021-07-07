import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

export default () => {
  const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
  return { store };
};
