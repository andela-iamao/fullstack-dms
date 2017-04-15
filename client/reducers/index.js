import { combineReducers } from 'redux';
import auth from './auth';
import documents from './documents';
import admin from './admin';

export default combineReducers({
  auth,
  documents,
  admin,
});
