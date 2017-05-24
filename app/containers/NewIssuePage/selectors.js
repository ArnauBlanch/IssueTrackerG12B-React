import { createSelector } from 'reselect';

/**
 * Direct selector to the newIssuePage state domain
 */
const selectNewIssuePageDomain = () => (state) => state.get('newIssuePage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NewIssuePage
 */

const makeSelectAuthUser = () => (state) => state.get('auth').get('authUser');

const makeSelectNewIssuePage = () => createSelector(
  selectNewIssuePageDomain(),
  (substate) => substate.toJS()
);

export {
  makeSelectNewIssuePage,
  selectNewIssuePageDomain,
  makeSelectAuthUser,
};
