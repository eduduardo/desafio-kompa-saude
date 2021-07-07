import 'react-native';
import React from 'react';
import HomePage from '../HomePage';
import { renderWithRedux, makeTestStore } from '../../common/render-test';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

describe('home page test suite', () => {
  const testingStore = makeTestStore();
  const mockNavigate = jest.fn();
  const mocksetOptions = jest.fn();

  beforeEach(() => {
    useNavigation.mockImplementation(() => ({
      navigate: mockNavigate,
      setOptions: mocksetOptions,
    }));
  });

  test('renders correctly the HomePage Text', () => {
    const { getByText } = renderWithRedux(<HomePage />, {
      store: testingStore,
    });

    expect(getByText(/Adicionar novo prontuário/i)).toBeTruthy();
  });

  test('user can go to create a new medical record', async () => {
    const { getByText } = renderWithRedux(<HomePage />, {
      store: testingStore,
    });

    fireEvent.press(getByText('Adicionar novo prontuário'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('NewMedicalRecord');
  });
});
