import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import Loader from '../Loader';

test('render correctly the loader compoenent', () => {
  render(<Loader />);
});
