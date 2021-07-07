import request from '../common/request';

export const FETCH_ILLNESSES = 'FETCH_ILLNESSES';
export const FETCH_COMPLAINTS = 'FETCH_COMPLAINTS';

export const fetchIllnesses = illnesses => {
  return { type: FETCH_ILLNESSES, illnesses };
};

export function getIllnesses() {
  return dispatch => {
    return request({ url: '/doencas' }).then(response => {
      dispatch(fetchIllnesses(response.data));
    });
  };
}

export const fetchComplaints = complaints => {
  return { type: FETCH_COMPLAINTS, complaints };
};

export function getComplaints() {
  return dispatch => {
    return request({ url: '/queixas' }).then(response => {
      dispatch(fetchComplaints(response.data));
    });
  };
}

export function testAPI() {
  return request({ url: '/' });
}
