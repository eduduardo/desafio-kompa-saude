import { combineReducers } from 'redux';
import medicalRecords from './medicalRecords';
import medicalInfos from './medicalInfos';

const rootReducer = combineReducers({
  medicalRecords,
  medicalInfos,
});
export default rootReducer;
