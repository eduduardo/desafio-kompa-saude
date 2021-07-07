import 'react-native';
import React from 'react';
import HomePage from '../HomePage';
import { renderWithRedux, makeTestStore } from '../../common/render-test';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';

describe('home page test suite', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    useNavigation.mockImplementation(() => ({
      navigate: mockNavigate,
    }));
  });

  const setup = initialState => {
    const utils = renderWithRedux(<HomePage />, {
      store: makeTestStore(initialState),
    });
    return {
      ...utils,
    };
  };

  test('renders correctly the home page', () => {
    const { getByText } = setup();

    expect(getByText(/Adicionar novo prontuário/i)).toBeTruthy();
  });

  test('user can go to create a new medical record', async () => {
    const { getByText } = setup();

    fireEvent.press(getByText('Adicionar novo prontuário'));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith('NewMedicalRecord');
  });

  test('user see empty message', async () => {
    const { getByText } = setup();

    await waitFor(() =>
      expect(getByText(/Nenhum prontuário cadastrado/)).toBeTruthy(),
    );
  });

  test('user see multiple records', async () => {
    const initialState = {
      medicalRecords: {
        medicalRecords: [
          {
            complaint: { id: 2, label: 'Dor de cabeça' },
            date: '2021-07-07T11:04:34.704Z',
            history: 'Prontuario Um',
            id: 'UtyiXZInYv4i15qa',
            illnesses: [
              {
                label: 'Diabetes',
                id: 1,
              },
            ],
          },
          {
            complaint: { id: 1, label: 'Vômito' },
            date: '2021-07-07T11:03:23.225Z',
            history: 'Prontuario Dois',
            id: 'HQmt5yaE1ywD5uEM',
            illnesses: [
              {
                label: 'Diabetes',
                id: 1,
              },
            ],
          },
        ],
      },
    };

    const { getByText, getAllByText } = setup(initialState);

    await waitFor(() => expect(getByText(/Prontuario Um/)).toBeTruthy());
    await waitFor(() => expect(getByText(/Prontuario Dois/)).toBeTruthy());
    await waitFor(() => expect(getAllByText(/JUL/).length).toBe(2));
    await waitFor(() => expect(getAllByText(/Diabetes/).length).toBe(2));
  });
});
