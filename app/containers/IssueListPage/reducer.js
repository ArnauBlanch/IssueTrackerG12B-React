/*
 *
 * IssueListPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

const initialState = fromJS({
  issues: undefined,
  error: false,
  currentlySending: false,
});

function issueListPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUES_SUCCESS:
      return state.set('issues', fromJS(action.issues)).set('error', false);
    case GET_ISSUES_FAILURE:
      return state.set('error', true);
    case CURRENTLY_SENDING:
      return state.set('currentlySending', true);
    default:
      return state;
  }
}

export default issueListPageReducer;
