/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import medicalRecords from '../../reducers/medicalRecords';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('medical records reducers suite', () => {
  test('initial medical records reducer', () => {
    const initialState = {
      medicalRecords: [],
    };
    expect(medicalRecords(undefined, {})).toEqual(initialState);
  });
});
