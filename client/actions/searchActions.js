import axios from 'axios';
import { SEARCH_RESULTS } from './types';

export function documentsSearched(documentSearchResult) {
  return {
    type: SEARCH_RESULTS,
    documentSearchResult,
  };
}

/**
 * Dispatch action to search a document
 * @param {any} queryString
 * @returns {Object} function
 */
export function searchDocuments(queryString) {
  return (dispatch) => {
    return axios.get(`/search/documents?q=${queryString}`)
      .then((res) => {
        dispatch(documentsSearched(res.data));
      });
  };
}
