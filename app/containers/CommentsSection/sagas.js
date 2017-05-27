import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { CREATE_COMMENT_REQUEST, EDIT_COMMENT_REQUEST, DELETE_COMMENT } from './constants';
import { createCommentSuccess, createCommentFailure, editCommentSuccess, editCommentFailure } from './actions';
import { getIssueRequest } from '../IssueDetailsPage/actions';
import request from '../../utils/request';

export function* createComment() {
  while (true) { // eslint-disable-line
    const { issueID, comment } = yield take(CREATE_COMMENT_REQUEST);
    try {
      const response = yield call(request, `/issues/${issueID}/comments`, 'POST', comment, true);
      if (response.status === 201) {
        yield put(createCommentSuccess());
        yield put(getIssueRequest(issueID));
      } else if (response.status === 404) {
        yield put(push('/'));
        yield put(createCommentFailure());
      } else {
        yield put(createCommentFailure());
      }
    } catch (e) {
      yield put(createCommentFailure());
    }
  }
}


export function* editComment() {
  while (true) { // eslint-disable-line
    const { url, comment } = yield take(EDIT_COMMENT_REQUEST);
    try {
      const response = yield call(request, url, 'PATCH', comment, true);
      const issueID = url.split('/')[2];
      if (response.status === 200) {
        yield put(editCommentSuccess());
        yield put(getIssueRequest(issueID));
      } else if (response.status === 404) {
        yield put(push(`/issues/${issueID}`));
        yield put(editCommentFailure());
      } else {
        yield put(editCommentFailure());
      }
    } catch (e) {
      yield put(editCommentFailure());
    }
  }
}

export function* deleteComment() {
  while (true) { // eslint-disable-line
    const { url } = yield take(DELETE_COMMENT);
    const response = yield call(request, url, 'DELETE', undefined, false);
    if (response.status === 200) {
      const issueID = url.split('/')[2];
      yield put(getIssueRequest(issueID));
    }
  }
}

export function* defaultSaga() {
  yield fork(createComment);
  yield fork(editComment);
  yield fork(deleteComment);
}

// All sagas to be loaded
export default [
  defaultSaga,
];
