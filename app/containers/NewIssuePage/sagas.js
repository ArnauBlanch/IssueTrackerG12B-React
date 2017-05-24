import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import request from '../../utils/request';
import { GET_USERS_REQUEST, CREATE_ISSUE_REQUEST } from './constants';
import { getUsersSuccess, createIssueSuccess, createIssueFailure } from './actions';


export function* getUsers() {
  while (true) { // eslint-disable-line
    yield take(GET_USERS_REQUEST);
    const response = yield call(request, '/users', 'GET', undefined, true);
    if (response.status === 200 || response.status === 304) {
      const users = yield response.json();
      yield put(getUsersSuccess(users));
    }
  }
}

export function* createIssue() {
  while (true) { // eslint-disable-line
    const { issue } = yield take(CREATE_ISSUE_REQUEST);
    const response = yield call(request, '/issues', 'POST', issue, true);
    if (response.status === 201) {
      const responseBody = yield response.json();
      yield put(createIssueSuccess());
      yield put(push(`/issues/${responseBody.id}`));
    } else {
      yield put(createIssueFailure(response.status));
    }
  }
}

export function* newIssuePageSaga() {
  yield fork(getUsers);
  yield fork(createIssue);
}

// All sagas to be loaded
export default [
  newIssuePageSaga,
];
