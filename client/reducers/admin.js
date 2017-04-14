import { SET_USERS, USER_FETCHED, USER_UPDATED, USER_DELETED } from '../actions/types';

export default function users(state = [], action = {}) {
  switch(action.type) {
    case USER_FETCHED:
      {
        const index = state.findIndex(item => item.id === action.user.id);
        if (index > -1) {
          return state.map(item => {
            if (item.id === action.user.id) return action.user;
            return item;
          });
        } else {
          return [
            ...state,
            action.user,
          ];
        }
      }
    case USER_UPDATED:
      return state.map(item => {
        if (item.id === action.user.id) return action.user;
        return item;
      });
    case USER_DELETED:
      return state.filter(item => item.id !== action.userId)
    case SET_USERS:
      return action.users;
    default: return state;
  }
}