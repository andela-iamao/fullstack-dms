import axios from 'axios';
import { SET_USERS, USER_FETCHED, USER_UPDATED, USER_DELETED } from './types';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

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

export function fetchUsers() {
  return (dispatch) => {
    return axios.get('/users')
      .then(res => res.data)
      .then(data => dispatch(setUsers(data)));
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    return axios.get(`/users/${id}`)
      .then(res => res.data)
      .then(data => dispatch(userFetched(data.user)));
  };
}

export function updateUser(data) {
  return (dispatch) => {
    return axios.put(`/users/${data.id}`)
      .then(res => res.data)
      .then(data => dispatch(userUpdated(data.user)));
  };
}
export function deleteUser(id) {
  return (dispatch) => {
    return axios.delete(`/users/${id}`)
      .then(res => res.data)
      .then(data => dispatch(userDeleted(id)));
  };
}

