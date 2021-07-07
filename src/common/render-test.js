import React from 'react';
import { render } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import createStore from '../common/store';

export function renderWithRedux(ui, { store, ...otherOpts }) {
  return render(<Provider store={store}>{ui}</Provider>, otherOpts);
}

export function makeTestStore(opts = {}) {
  const { store } = createStore(opts);
  return store;
}
