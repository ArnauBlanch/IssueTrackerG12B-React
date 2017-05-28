import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { getUsersSuccess, editIssueSuccess, editIssueFailure } from './actions';
import { GET_USERS_REQUEST, EDIT_ISSUE_REQUEST } from './constants';
import request from '../../utils/request';
import { getIssueRequest } from '../IssueDetailsPage/actions';

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

export function* editIssue() {
  while (true) { // eslint-disable-line
    const editRequest = yield take(EDIT_ISSUE_REQUEST);
    const issueID = editRequest.id;
    const { newValues } = editRequest;
    try {
      const response = yield call(request, `/issues/${issueID}`, 'PATCH', newValues, true);
      if (response.status === 200) {
        yield put(editIssueSuccess());
        if (Object.keys(newValues).length < 3 &&
        (Object.keys(newValues).indexOf('status') !== -1 ||
        Object.keys(newValues).indexOf('attached_files') !== -1)) {
          yield put(getIssueRequest(issueID));
        } else {
          yield put(push(`/issues/${issueID}`));
        }
      } else {
        const responseBody = yield response.json();
        yield put(editIssueFailure(responseBody.error));
      }
    } catch (e) {
      yield put(editIssueFailure(e));
    }
  }
}

export function* editIssueSaga() {
  yield fork(getUsers);
  yield fork(editIssue);
}

// All sagas to be loaded
export default [
  editIssueSaga,
];
