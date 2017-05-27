/*
 *
 * IssueDetailsPage actions
 *
 */

import {
  GET_ISSUE_REQUEST,
  GET_ISSUE_SUCCESS,
  GET_ISSUE_FAILURE,
  CURRENTLY_SENDING,
  DELETE_COMMENT,
} from './constants';

export function getIssueRequest(id) {
  return { type: GET_ISSUE_REQUEST, id };
}

export function getIssueSuccess(issue) {
  return { type: GET_ISSUE_SUCCESS, issue };
}

export function getIssueFailure() {
  return { type: GET_ISSUE_FAILURE };
}

export function currentlySending(sending) {
  return { type: CURRENTLY_SENDING, sending };
}

export function deleteComment(url) {
  return { type: DELETE_COMMENT, url };
}
