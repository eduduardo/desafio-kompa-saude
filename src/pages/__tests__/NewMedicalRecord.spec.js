import 'react-native';
import React from 'react';
import { renderWithRedux, makeTestStore } from '../../common/render-test';
import { fireEvent, waitFor } from '@testing-library/react-native';
import { useNavigation } from '@react-navigation/native';
import NewMedicalRecord from '../NewMedicalRecord';

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
  const mocksetOptions = jest.fn();

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
      setOptions: mocksetOptions,
    }));
  });

  test('renders correctly the new medical record page', () => {
    const { getByText } = setup();

    expect(getByText(/Salvar/i)).toBeTruthy();
  });

  // test('user can select complaint', async () => {
  //   const { getAllByText, getByText, getByTestId, debug } = setup();

  //   const complaintSelect = getAllByText(/Selecione/)[0];

  //   fireEvent.press(complaintSelect.parent);

  //   await waitFor(() => expect(getAllByText(/Dor nas costas/)).toBeTruthy());

  //   debug();
  // });

  // test('user can select illnesses', async () => {
  //   const { getByText } = setup();

  //   await waitFor(() => expect(getByText(/Diabetes/)).toBeTruthy());
  // });

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
        /O histórico deve ter o mínimo de 10 caracteres e máximo de 1000./i,
      ),
    ).toBeTruthy();
  });

  // test('if form valid, no message is showed and user is redirect back to home', () => {
  //   const { getByText, getByPlaceholderText } = renderWithRedux(
  //     <NewMedicalRecord />,
  //     {
  //       store: testingStore,
  //     },
  //   );

  //   const input = getByPlaceholderText(/Digite/);
  //   fireEvent.changeText(input, 'Um histórico teste');

  //   fireEvent.press(getByText(/Salvar/));

  //   expect(getByText(/Qual seria sua queixa principal\?/i)).toBeFalsy();
  //   expect(
  //     getByText(
  //       /O histórico deve ter o mínimo de 10 caracteres e máximo de 1000./i,
  //     ),
  //   ).toBeFalsy();
  // });
});
