import 'react-native';
import React from 'react';
import { renderWithRedux, makeTestStore } from '../../common/render-test';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import NewMedicalRecord from '../NewMedicalRecord';

import MockAdapter from 'axios-mock-adapter';
import { axiosInstance } from '../../common/request';
const mockApi = new MockAdapter(axiosInstance);

describe('new medical records test suite', () => {
  const initialState = {
    medicalInfos: {
      illnesses: [
        {
          label: 'Diabetes',
          id: 1,
        },
        {
          label: 'Câncer',
          id: 2,
        },
      ],
      complaints: [
        {
          label: 'Dor de cabeça',
          id: 1,
        },
        {
          label: 'Dor nas costas',
          id: 2,
        },
      ],
    },
  };
  const testingStore = makeTestStore(initialState);
  const mockNavigate = jest.fn();
  const mockGoBack = jest.fn();

  const setup = () => {
    const utils = renderWithRedux(<NewMedicalRecord />, {
      store: testingStore,
    });
    return {
      ...utils,
    };
  };

  beforeEach(() => {
    useNavigation.mockImplementation(() => ({
      navigate: mockNavigate,
      goBack: mockGoBack,
    }));
  });

  test('renders correctly the new medical record page', () => {
    const { getByText } = setup();

    expect(getByText(/Salvar/i)).toBeTruthy();
  });

  test('user can select complaint', async () => {
    const { getAllByText } = setup();

    const complaintSelect = getAllByText(/Dor nas costas/)[0];

    fireEvent.press(complaintSelect);

    await waitFor(() => expect(getAllByText(/Dor nas costas/).length).toBe(2));
  });

  test('user can select illnesses', async () => {
    const { getAllByText } = setup();

    const complaintSelect = getAllByText(/Diabetes/)[0];

    fireEvent.press(complaintSelect);

    await waitFor(() => expect(getAllByText(/Diabetes/).length).toBe(2));
  });

  test('user type history', () => {
    const { getByPlaceholderText } = setup();

    const input = getByPlaceholderText(/Digite/);
    fireEvent.changeText(input, 'Um histórico teste');
    expect(input.props.value).toBe('Um histórico teste');
  });

  test('shows messages if input is invalid', () => {
    const { getByText } = setup();

    fireEvent.press(getByText(/Salvar/));

    expect(getByText(/Qual seria sua queixa principal\?/i)).toBeTruthy();
    expect(
      getByText(
        /O histórico deve ter o mínimo de 10 caracteres e máximo de 1000/i,
      ),
    ).toBeTruthy();
  });

  test('if form valid, no error messages displayed and user is redirect back to home', async () => {
    const record = {
      queixa: { id: 1, label: 'Vômito' },
      created_at: '2021-07-07T11:03:23.225Z',
      historico: 'Prontuario Dois',
      _id: 'HQmt5yaE1ywD5uEM',
      doencas: [
        {
          label: 'Diabetes',
          id: 1,
        },
      ],
    };
    mockApi.onPost('/prontuario').replyOnce(200, record);

    const { getByText, getAllByText, getByPlaceholderText, queryByText } =
      renderWithRedux(<NewMedicalRecord />, {
        store: testingStore,
      });

    const complaintSelect = getAllByText(/Dor nas costas/)[0];
    fireEvent.press(complaintSelect);

    const illenessSelect = getAllByText(/Diabetes/)[0];
    fireEvent.press(illenessSelect);

    await waitFor(() => expect(getAllByText(/Diabetes/).length).toBe(2));

    const input = getByPlaceholderText(/Digite/);
    fireEvent.changeText(input, 'Um histórico teste');

    fireEvent.press(getByText(/Salvar/));

    expect(queryByText(/Qual seria sua queixa principal/)).toBeNull();
    expect(
      queryByText(
        /O histórico deve ter o mínimo de 10 caracteres e máximo de 1000/,
      ),
    ).toBeNull();

    await waitFor(() => expect(mockGoBack).toHaveBeenCalledTimes(1));
  });
});
