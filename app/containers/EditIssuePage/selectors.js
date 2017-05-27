import { createSelector } from 'reselect';

/**
 * Direct selector to the editIssuePage state domain
 */
const selectEditIssuePageDomain = () => (state) => state.get('editIssuePage');

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditIssuePage
 */

const makeSelectEditIssuePage = () => createSelector(
  selectEditIssuePageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectEditIssuePage;
export {
  selectEditIssuePageDomain,
};
