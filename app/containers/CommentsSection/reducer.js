/*
 *
 * CommentsSection reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_COMMENT_REQUEST,
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_FAILURE,
  CLEAR_CREATE_ERROR,
  EDIT_COMMENT_SUCCESS,
  EDIT_COMMENT_FAILURE,
  EDIT_COMMENT_REQUEST,
  CLEAR_EDIT_ERROR,
} from './constants';

const initialState = fromJS({
  createError: false,
  editError: false,
  sendingComment: false,
});

function commentsSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      return state.set('createError', false).set('sendingComment', false);
    case CREATE_COMMENT_FAILURE:
      return state.set('createError', true).set('sendingComment', false);
    case CREATE_COMMENT_REQUEST:
      return state.set('sendingComment', true);
    case CLEAR_CREATE_ERROR:
      return state.set('createError', false);
    case EDIT_COMMENT_SUCCESS:
      return state.set('editError', false).set('sendingComment', false);
    case EDIT_COMMENT_FAILURE:
      return state.set('editError', true).set('sendingComment', false);
    case EDIT_COMMENT_REQUEST:
      return state.set('sendingComment', true);
    case CLEAR_EDIT_ERROR:
      return state.set('editError', false);
    default:
      return state;
  }
}

export default commentsSectionReducer;
