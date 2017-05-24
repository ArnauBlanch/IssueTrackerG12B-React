import { take, call, put, fork } from 'redux-saga/effects';
import { GET_ISSUES_REQUEST } from './constants';
import request from '../../utils/request';
import { getIssuesSuccess, getIssuesFailure, currentlySending } from './actions';

export function* getIssues() {
  while (true) {
    yield take(GET_ISSUES_REQUEST);
    yield put(currentlySending(true));
    const response = yield call(request, '/issues', 'GET', undefined, false);
    if (response.status === 200) {
      const issues = yield response.json();
      yield put(getIssuesSuccess(issues));
    } else {
      yield put(getIssuesFailure());
    }
    yield put(currentlySending(false));
  }
}

// Individual exports for testing
export function* issueListSaga() {
  yield fork(getIssues);
}

// All sagas to be loaded
export default [
  issueListSaga,
];
