import { take, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { GET_ISSUE_REQUEST, VOTE_ISSUE, WATCH_ISSUE, DELETE_ISSUE } from './constants';
import { getIssueRequest, getIssueSuccess, getIssueFailure, currentlySending } from './actions';
import request from '../../utils/request';
import { getIssuesRequest } from '../IssueListPage/actions';

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

export function* voteIssue() {
  while(true) { // eslint-disable-line
    const { id } = yield take(VOTE_ISSUE);
    const response = yield call(request, `/issues/${id}/vote`, 'POST', undefined, true);
    if (response.status === 200) {
      yield put(getIssueRequest(id));
    } else if (response.status === 404) {
      yield put(push('/issue-not-found'));
    }
  }
}

export function* watchIssue() {
  while(true) { // eslint-disable-line
    const { id } = yield take(WATCH_ISSUE);
    const response = yield call(request, `/issues/${id}/watch`, 'POST', undefined, true);
    if (response.status === 200) {
      yield put(getIssueRequest(id));
    } else if (response.status === 404) {
      yield put(push('/issue-not-found'));
    }
  }
}

export function* deleteIssue() {
  while(true) { // eslint-disable-line
    const { url } = yield take(DELETE_ISSUE);
    const response = yield call(request, url, 'DELETE', undefined, true);
    if (response.status === 200) {
      yield put(getIssuesRequest());
    } else if (response.status === 404) {
      yield put(push('/issue-not-found'));
    }
  }
}

export function* issueDetailsSaga() {
  yield fork(getIssue);
  yield fork(voteIssue);
  yield fork(watchIssue);
  yield fork(deleteIssue);
}

export default [
  issueDetailsSaga,
];
