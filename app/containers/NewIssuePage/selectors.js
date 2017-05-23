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

const makeSelectNewIssuePage = () => createSelector(
  selectNewIssuePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectNewIssuePage;
export {
  selectNewIssuePageDomain,
};
