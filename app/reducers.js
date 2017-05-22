/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { combineReducers } from 'redux-immutable';
import { fromJS } from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

import { SET_AUTH_TOKEN, SET_UNAUTHENTICATED } from './containers/App/constants';
import languageProviderReducer from './containers/LanguageProvider/reducer';

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

const authInitialState = fromJS({
  authUser: localStorage.getItem('authToken'),
  isAuthenticated: localStorage.getItem('authToken') !== null,
});

function authReducer(state = authInitialState, action) {
  switch (action.type) {
    case SET_UNAUTHENTICATED:
      localStorage.removeItem('authToken');
      return state.set('isAuthenticated', false)
                  .set('authUser', undefined);
    case SET_AUTH_TOKEN:
      localStorage.setItem('authToken', action.token);
      return state.set('isAuthenticated', true)
                  .set('authUser', action.token);
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */
export default function createReducer(asyncReducers) {
  return combineReducers({
    route: routeReducer,
    language: languageProviderReducer,
    auth: authReducer,
    ...asyncReducers,
  });
}
