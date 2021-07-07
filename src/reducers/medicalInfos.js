import { FETCH_COMPLAINTS, FETCH_ILLNESSES } from '../actions/medicalInfos';

const initialState = {
  complaints: [],
  illnesses: [],
};

const medicalInfos = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ILLNESSES: {
      return {
        ...state,
        illnesses: action.illnesses,
      };
    }
    case FETCH_COMPLAINTS: {
      return {
        ...state,
        complaints: action.complaints,
      };
    }
    default: {
      return state;
    }
  }
};
export default medicalInfos;
