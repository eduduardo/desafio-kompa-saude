import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import MedicalRecord from '../MedicalRecord';

test('render correctly the Medical Record component', () => {
  const record = {
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
  };
  const { getByText, getAllByText } = render(<MedicalRecord {...record} />);

  expect(getByText(/Prontuario Dois/i)).toBeTruthy();
  expect(getByText(/Vômito/i)).toBeTruthy();
  expect(getByText(/JUL/i)).toBeTruthy();
  expect(getAllByText(/Diabetes/i).length).toBe(1);
});
