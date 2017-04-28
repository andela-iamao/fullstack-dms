import axios from 'axios';
import { SET_USERS, USER_FETCHED, USER_UPDATED, USER_DELETED } from './types';
import { setPagination } from './documentActions';

export function setUsers(users) {
  return {
    type: SET_USERS,
    users,
  };
}

export function userFetched(user) {
  return {
    type: USER_FETCHED,
    user,
  };
}

export function userUpdated(user) {
  return {
    type: USER_UPDATED,
    user,
  };
}

export function userDeleted(userId) {
  return {
    type: USER_DELETED,
    userId,
  };
}

/**
 * Dispatch action to fetch users
 * @returns {Array} users
 */
export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/users')
      .then(res => {
        dispatch(setUsers(res.data.rows));
        dispatch(setPagination(res.data.pagination));
      });
  };
}

/**
 * Dispatch action to fetch a user
 * @param {any} id
 * @returns {Object} function
 */
export function fetchUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
      .then(res => dispatch(userFetched(res.data)));
  };
}

/**
 * Dispatch action to update a user
 * @param {any} user
 * @returns {Object} function
 */
export function updateUser(user) {
  return (dispatch) => {
    return axios.put(`/users/${user.id}`, user)
      .then(res => dispatch(userUpdated(res.data)));
  };
}

/**
 * Dispatches action for delete
 * @param {any} id
 * @returns {Object} function
 */
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
      .then(res => dispatch(userDeleted(id)));
  };
}

