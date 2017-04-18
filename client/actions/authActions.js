import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './types';

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
}

export function clearDocuments(documents) {
  return {
    type: types.CLEAR_DOCUMENTS,
    documents,
  };
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(clearDocuments([]));
  };
}

export function login(data) {
  return dispatch =>
     axios.post('/users/login', data)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
      });
}
