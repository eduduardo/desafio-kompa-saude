import 'react-native';
import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import Button from '../Button';
import { Text } from 'react-native';

test('render button component according with the props', () => {
  const { getByText } = render(<Button content="TestButton" />);

  expect(getByText(/TestButton/i)).toBeTruthy();
});

test('render button component according as children', () => {
  const { getByText } = render(
    <Button>
      <Text>Children Text</Text>
    </Button>,
  );

  expect(getByText(/Children Text/i)).toBeTruthy();
});

test('onPress props button component is called when use press', () => {
  const onPressMock = jest.fn();

  const { getByText } = render(
    <Button content="Press button" onPress={onPressMock} />,
  );

  fireEvent.press(getByText('Press button'));
  expect(onPressMock).toHaveBeenCalled();
});
