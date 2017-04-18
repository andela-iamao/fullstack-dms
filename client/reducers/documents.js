import * as types from '../actions/types';

export default function documents(state = [], action = {}) {
  switch(action.type) {
    case types.ADD_DOCUMENT:
      return [
        ...state,
        action.document,
      ];
    case types.DOCUMENT_FETCHED:
      {
        const index = state.findIndex(item => item.id === action.document.id);
        if (index > -1) {
          return state.map(item => {
            if (item.id === action.document.id) return action.document;
            return item;
          });
        } else {
          return [
            ...state,
            action.document,
          ];
        }
      }
    case types.DOCUMENT_UPDATED:
      return state.map(item => {
        if (item.id === action.document.id) return action.document;
        return item;
      });
    case types.DOCUMENT_DELETED:
      return state.filter(item => item.id !== action.documentId)
    case types.SET_DOCUMENTS:
      return action.documents;
    case types.CLEAR_DOCUMENTS:
      return action.documents;

    default: return state;
  }
}