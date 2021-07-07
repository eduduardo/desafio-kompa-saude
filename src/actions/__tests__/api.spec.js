/* eslint-disable no-undef */
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import MockAdapter from 'axios-mock-adapter';
import { FETCH_COMPLAINTS, getComplaints, getIllnesses } from '../medicalInfos';
import { axiosInstance } from '../../common/request';
import medicalInfos from '../../reducers/medicalInfos';
import { FETCH_ILLNESSES } from '../medicalInfos';
import { createRecord, CREATE_RECORD } from '../medicalRecord';
import medicalRecords from '../../reducers/medicalRecords';

const mockApi = new MockAdapter(axiosInstance);
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('actions api', () => {
  const initialState = {};
  beforeEach(() => {
    mockApi.reset();
  });

  test('get queixas', async () => {
    mockApi.onGet('/queixas').replyOnce(200, {
      ok: true,
      data: [
        {
          label: 'Dor de cabeça',
          id: 1,
        },
        {
          label: 'Dor nas costas',
          id: 2,
        },
      ],
    });

    const store = mockStore(initialState);

    await store.dispatch(getComplaints());

    const actualActions = store.getActions();
    expect(actualActions).toHaveLength(1);
    expect(actualActions[0].type).toEqual(FETCH_COMPLAINTS);

    const storeUpdated = actualActions.reduce(
      (prev, current) => medicalInfos(prev, current),
      initialState,
    );

    expect(storeUpdated.complaints).toHaveLength(2);
    expect(storeUpdated.complaints[0].label).toEqual('Dor de cabeça');
    expect(storeUpdated.complaints[1].label).toEqual('Dor nas costas');
  });

  test('get doenças', async () => {
    mockApi.onGet('/doencas').replyOnce(200, {
      ok: true,
      data: [
        {
          label: 'Diabetes',
          id: 1,
        },
        {
          label: 'Câncer',
          id: 2,
        },
      ],
    });

    const store = mockStore(initialState);

    await store.dispatch(getIllnesses());

    const actualActions = store.getActions();
    expect(actualActions).toHaveLength(1);
    expect(actualActions[0].type).toEqual(FETCH_ILLNESSES);

    const storeUpdated = actualActions.reduce(
      (prev, current) => medicalInfos(prev, current),
      initialState,
    );

    expect(storeUpdated.illnesses).toHaveLength(2);
    expect(storeUpdated.illnesses[0].label).toEqual('Diabetes');
    expect(storeUpdated.illnesses[1].label).toEqual('Câncer');
  });

  test('post record', async () => {
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
    const initialStateRecords = { medicalRecords: [] };
    const store = mockStore(initialStateRecords);

    await store.dispatch(
      createRecord({
        history: record.historic,
        complaints: record.queixa,
        illnesses: record.doencas,
      }),
    );

    const actualActions = store.getActions();
    expect(actualActions).toHaveLength(1);
    expect(actualActions[0].type).toEqual(CREATE_RECORD);

    const storeUpdated = actualActions.reduce(
      (prev, current) => medicalRecords(prev, current),
      initialStateRecords,
    );

    expect(storeUpdated.medicalRecords).toHaveLength(1);
    expect(storeUpdated.medicalRecords[0].id).toEqual(record._id);
    expect(storeUpdated.medicalRecords[0].history).toEqual(record.historico);
    expect(storeUpdated.medicalRecords[0].complaint).toEqual(record.queixa);
    expect(storeUpdated.medicalRecords[0].illnesses).toEqual(record.doencas);
    expect(storeUpdated.medicalRecords[0].date).toEqual(record.created_at);
  });
});
