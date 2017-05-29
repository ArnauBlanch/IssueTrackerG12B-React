/*
 *
 * EditIssuePage actions
 *
 */

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  EDIT_ISSUE_REQUEST,
  EDIT_ISSUE_SUCCESS,
  EDIT_ISSUE_FAILURE,
  CLEAR_ERROR,
} from './constants';

export function getUsersRequest() {
  return { type: GET_USERS_REQUEST };
}

export function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, users };
}

export function editIssueRequest(id, newValues, isEditing) {
  return { type: EDIT_ISSUE_REQUEST, id, newValues, isEditing };
}

export function editIssueSuccess() {
  return { type: EDIT_ISSUE_SUCCESS };
}

export function editIssueFailure(error) {
  return { type: EDIT_ISSUE_FAILURE, error };
}

export function clearError() {
  return { type: CLEAR_ERROR };
}
