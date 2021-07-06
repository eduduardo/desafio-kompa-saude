import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App';

describe('home page test suite', () => {
  test('renders correctly the Kompa Saude Text', () => {
    const { getByText } = render(<App />);

    expect(getByText(/Kompa Saude/i)).toBeTruthy();
  });
});
