/*
 *
 * CommentsSection actions
 *
 */

import {
  DELETE_COMMENT,
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CLEAR_CREATE_ERROR,
  EDIT_COMMENT_REQUEST,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  CLEAR_EDIT_ERROR,
} from './constants';

export function deleteComment(url) {
  return { type: DELETE_COMMENT, url };
}

export function createCommentRequest(issueID, comment) {
  return { type: CREATE_COMMENT_REQUEST, issueID, comment };
}

export function createCommentSuccess() {
  return { type: CREATE_COMMENT_SUCCESS };
}

export function createCommentFailure() {
  return { type: CREATE_COMMENT_FAILURE };
}

export function clearCreateError() {
  return { type: CLEAR_CREATE_ERROR };
}

export function editCommentRequest(url, comment) {
  return { type: EDIT_COMMENT_REQUEST, url, comment };
}

export function editCommentSuccess() {
  return { type: EDIT_COMMENT_SUCCESS };
}

export function editCommentFailure() {
  return { type: EDIT_COMMENT_FAILURE };
}

export function clearEditError() {
  return { type: CLEAR_EDIT_ERROR };
}
