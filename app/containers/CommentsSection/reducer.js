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
  CLEAR_COMMENT_ERROR,
} from './constants';

const initialState = fromJS({
  commentError: false,
  sendingComment: false,
});

function commentsSectionReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_COMMENT_SUCCESS:
      return state.set('commentError', false).set('sendingComment', false);
    case CREATE_COMMENT_FAILURE:
      return state.set('commentError', true).set('sendingComment', false);
    case CREATE_COMMENT_REQUEST:
      return state.set('sendingComment', true);
    case CLEAR_COMMENT_ERROR:
      return state.set('commentError', false);
    default:
      return state;
  }
}

export default commentsSectionReducer;
