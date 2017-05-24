/*
 *
 * NewIssuePage actions
 *
 */

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  CREATE_ISSUE_REQUEST,
  CREATE_ISSUE_SUCCESS,
  CREATE_ISSUE_FAILURE,
  CURRENTLY_SENDING,
} from './constants';

export function getUsersRequest() {
  return { type: GET_USERS_REQUEST };
}

export function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, users };
}

export function createIssueRequest(issue) {
  return { type: CREATE_ISSUE_REQUEST, issue};
}

export function createIssueSuccess() {
  return { type: CREATE_ISSUE_SUCCESS };
}

export function createIssueFailure(error) {
  return { type: CREATE_ISSUE_FAILURE, error };
}

export function currentlySending(sending) {
  return { type: CURRENTLY_SENDING, sending };
}
