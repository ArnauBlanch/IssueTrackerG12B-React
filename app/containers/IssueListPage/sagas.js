import { take, call, put, select } from 'redux-saga/effects';
import { GET_ISSUES_REQUEST } from './constants';

export function* getIssues() {
  while (true) {
    yield take(GET_ISSUES_REQUEST);
  }
}

// Individual exports for testing
export function* issueListSaga() {
  // See example in containers/HomePage/sagas.js
}

// All sagas to be loaded
export default [
  issueListSaga,
];
