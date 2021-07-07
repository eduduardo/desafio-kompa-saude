import { CREATE_RECORD } from '../actions/medicalRecord';

const initialState = {
  medicalRecords: [],
};

const medicalRecords = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_RECORD: {
      const record = {
        id: action.id,
        complaint: action.complaint,
        illnesses: action.illnesses,
        history: action.history,
        date: action.created_at,
      };
      return {
        ...state,
        medicalRecords: [...[record], ...state.medicalRecords],
      };
    }
    default: {
      return state;
    }
  }
};
export default medicalRecords;
