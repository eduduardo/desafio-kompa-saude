import 'react-native';
import React from 'react';
import HomePage from '../HomePage';
import { renderWithRedux, makeTestStore } from '../../common/render-test';

describe('home page test suite', () => {
  const testingStore = makeTestStore();
  test('renders correctly the HomePage Text', () => {
    const { getByText } = renderWithRedux(<HomePage />, {
      store: testingStore,
    });

    expect(getByText(/HomePage/i)).toBeTruthy();
  });
});
