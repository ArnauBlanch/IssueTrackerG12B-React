/*
 *
 * IssueDetailsPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  GET_ISSUE_SUCCESS,
  GET_ISSUE_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

const initialState = fromJS({
  issue: undefined,
  error: false,
  sending: false,
});

function issueDetailsPageReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ISSUE_SUCCESS:
      return state.set('issue', action.issue).set('error', false);
    case GET_ISSUE_FAILURE:
      return state.set('error', true);
    case CURRENTLY_SENDING:
      return state.set('currentlySending', action.sending);
    default:
      return state;
  }
}

export default issueDetailsPageReducer;
