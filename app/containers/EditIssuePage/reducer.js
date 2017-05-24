/*
 *
 * EditIssuePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USERS_SUCCESS,
} from './constants';

const initialState = fromJS({
  users: [],
});

function editIssuePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return state.set('users', action.users);
    default:
      return state;
  }
}

export default editIssuePageReducer;
