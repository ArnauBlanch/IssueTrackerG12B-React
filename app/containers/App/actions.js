import {
  SET_AUTH_TOKEN,
  SET_UNAUTHENTICATED,
} from './constants';

export function setAuthToken(token) {
  return { type: SET_AUTH_TOKEN, token };
}

export function setUnauthenticated() {
  return { type: SET_UNAUTHENTICATED };
}
