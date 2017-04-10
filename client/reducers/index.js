import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import flashMessages from './flashMessages';
import auth from './auth';

export default combineReducers({
  flashMessages,
  auth,
  form: formReducer,
});
