import * as types from '../actions/types';

export default function documents(state = {}, action = {}) {
  switch (action.type) {
    case types.SET_DOCUMENTPAGINATION:
      return action.pagination;
    default: return state;
  }
}
