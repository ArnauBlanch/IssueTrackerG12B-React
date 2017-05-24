/*
 *
 * EditIssuePage actions
 *
 */

import {
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
} from './constants';

export function getUsersRequest() {
  return { type: GET_USERS_REQUEST };
}

export function getUsersSuccess(users) {
  return { type: GET_USERS_SUCCESS, users };
}
