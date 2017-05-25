/*
 *
 * EditIssuePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USERS_SUCCESS,
  EDIT_ISSUE_SUCCESS,
  EDIT_ISSUE_FAILURE,
} from './constants';

const initialState = fromJS({
  users: [],
  error: undefined,
});

function editIssuePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return state.set('users', action.users);
    case EDIT_ISSUE_SUCCESS:
      return state.set('error', undefined);
    case EDIT_ISSUE_FAILURE:
      return state.set('error', action.error);
    default:
      return state;
  }
}

export default editIssuePageReducer;
