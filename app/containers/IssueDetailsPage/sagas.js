import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ISSUE_REQUEST, DELETE_COMMENT } from './constants';
import { getIssueRequest, getIssueSuccess, getIssueFailure, currentlySending } from './actions';
import request from '../../utils/request';

export function* getIssue() {
  while (true) { // eslint-disable-line
    const { id } = yield take(GET_ISSUE_REQUEST);
    yield put(currentlySending(true));
    const response = yield call(request, `/issues/${id}`, 'GET', undefined, false);
    yield put(currentlySending(false));
    if (response.status === 200) {
      const issue = yield response.json();
      yield put(getIssueSuccess(issue));
    } else if (response.status === 404) {
      yield put(push('/issue-not-found'));
    } else {
      yield put(getIssueFailure());
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

export function* issueDetailsSaga() {
  yield fork(getIssue);
  yield fork(deleteComment);
}

export default [
  issueDetailsSaga,
];
