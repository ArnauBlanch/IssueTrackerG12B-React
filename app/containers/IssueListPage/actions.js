/*
 *
 * IssueListPage actions
 *
 */

import {
  GET_ISSUES_REQUEST,
  GET_ISSUES_SUCCESS,
  GET_ISSUES_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

export function getIssuesRequest() {
  return {
    type: GET_ISSUES_REQUEST,
  };
}

export function getIssuesSuccess(issues) {
  return {
    type: GET_ISSUES_SUCCESS,
    issues,
  };
}

export function getIssuesFailure() {
  return {
    type: GET_ISSUES_FAILURE,
  };
}

export function currentlySending(sending) {
  return {
    type: CURRENTLY_SENDING,
    sending,
  };
}
