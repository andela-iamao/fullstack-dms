import axios from 'axios';
import * as types from './types';

export function setDocuments(documents) {
  return {
    type: types.SET_DOCUMENTS,
    documents,
  };
}
export function addDocument(document) {
  return {
    type: types.ADD_DOCUMENT,
    document,
  };
}

export function documentFetched(document) {
  return {
    type: types.DOCUMENT_FETCHED,
    document,
  };
}

export function documentUpdated(document) {
  return {
    type: types.DOCUMENT_UPDATED,
    document,
  };
}

export function documentDeleted(documentId) {
  return {
    type: types.DOCUMENT_DELETED,
    documentId,
  };
}


/**
 * Dispatched action to create a new document
 * @export
 * @param {any} data
 * @returns {object} object
 */
export function saveDocument(data) {
  return (dispatch) => {
    return axios.post('/documents', data)
       .then((response) => {
         dispatch(addDocument(response.data));
       })
      .catch((error) => {
        throw (error);
      });
  };
}

/**
 * Dispatches action to fetch all documents
 * @export
 * @param {*} payload
 * @returns {Array} documents
 */
export function fetchDocuments() {
  return (dispatch) => {
    return axios.get('/documents')
      .then(res => dispatch(setDocuments(res.data)));
  };
}


/**
 * Dispatch action to fetch a particular document
 * @export
 * @param {any} id
 * @returns {object} document
 */
export function fetchDocument(id) {
  return (dispatch) => {
    return axios.get(`/documents/${id}`)
      .then(res => res.data)
      .then(data => dispatch(documentFetched(data.document)));
  };
}

/**
 * Dispatch action to edit a document
 * @export
 * @param {any} data
 * @returns {object} document
 */
export function updateDocument(data) {
  return (dispatch) => {
    return axios.put(`/documents/${data.id}`, data)
      .then((res) => {
        fetchDocuments();
      });
  };
}


/**
 * Dispatch action to delete a document
 * @export
 * @param {any} id
 * @returns {object} document id
 */
export function deleteDocument(id) {
  return (dispatch) => {
    return axios.delete(`/documents/${id}`)
      .then(res => res.data)
      .then(data => dispatch(documentDeleted(id)));
  };
}

