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
  CLEAR_COMMENT_ERROR,
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

export function clearCommentError() {
  return { type: CLEAR_COMMENT_ERROR };
}
