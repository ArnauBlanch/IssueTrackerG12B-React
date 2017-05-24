import { take, call, put, fork } from 'redux-saga/effects';
import { getUsersSuccess } from './actions';
import { GET_USERS_REQUEST } from './constants';
import request from '../../utils/request';

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

export function* editIssueSaga() {
  yield fork(getUsers);
}

// All sagas to be loaded
export default [
  editIssueSaga,
];
