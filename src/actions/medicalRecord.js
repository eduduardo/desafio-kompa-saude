import request from '../common/request';
export const CREATE_RECORD = 'CREATE_RECORD';

export function createRecord({ complaint, illnesses, history }) {
  return dispatch => {
    return request({
      url: '/prontuario',
      method: 'POST',
      data: {
        queixa: complaint,
        doencas: illnesses,
        historico: history,
      },
    }).then(response => {
      const { _id, created_at, doencas, historico, queixa } = response;

      dispatch({
        type: CREATE_RECORD,
        id: _id,
        created_at,
        complaint: queixa,
        illnesses: doencas,
        history: historico,
      });
    });
  };
}
