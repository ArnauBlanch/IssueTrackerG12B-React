/*
 *
 * NewIssuePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_USERS_SUCCESS,
  CREATE_ISSUE_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

const initialState = fromJS({
  users: [],
  currentlySending: false,
  error: undefined,
});

function newIssuePageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      return state.set('users', action.users);
    case CREATE_ISSUE_FAILURE:
      return state.set('error', action.error);
    case CURRENTLY_SENDING:
      return state.set('currentlySending', action.sending);
    default:
      return state;
  }
}

export default newIssuePageReducer;
