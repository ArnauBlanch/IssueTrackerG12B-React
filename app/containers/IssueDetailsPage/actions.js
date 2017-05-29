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
  VOTE_ISSUE,
  WATCH_ISSUE,
  DELETE_ISSUE,
  DELETE_ATTACHED_FILE,
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

export function voteIssue(id) {
  return { type: VOTE_ISSUE, id };
}

export function watchIssue(id) {
  return { type: WATCH_ISSUE, id };
}

export function deleteIssue(url) {
  return { type: DELETE_ISSUE, url };
}

export function deleteAttachedFile(url, id) {
  return { type: DELETE_ATTACHED_FILE, url, id };
}
