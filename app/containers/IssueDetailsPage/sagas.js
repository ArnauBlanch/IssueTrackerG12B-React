import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ISSUE_REQUEST } from './constants';
import { getIssueSuccess, getIssueFailure, currentlySending } from './actions';
import request from '../../utils/request';

export function* getIssue() {
  while (true) { // eslint-disable-line
    const { id } = yield take(GET_ISSUE_REQUEST);
    yield put(currentlySending(true));
    const response = yield call(request, `/issues/${id}`, 'GET', undefined, true);
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

export function* issueDetailsSaga() {
  yield fork(getIssue);
}

export default [
  issueDetailsSaga,
];
