import { combineReducers } from 'redux';
import medicalRecords from './medicalRecords';

const rootReducer = combineReducers({
  medicalRecords,
});
export default rootReducer;
