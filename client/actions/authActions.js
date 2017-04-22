import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utils/setAuthorizationToken';
import * as types from './types';
import { setDocuments } from './documentActions';

export function setCurrentUser(user) {
  return {
    type: types.SET_CURRENT_USER,
    user,
  };
}

/**
 * Dispatch action to logout a user
 * @returns {Object} function
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({}));
    dispatch(setDocuments([]));
  };
}

/**
 * Dispatch action to login a user
 * @param {any} data
 * @returns {Object} function
 */
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
