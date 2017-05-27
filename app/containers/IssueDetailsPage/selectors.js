import { createSelector } from 'reselect';

/**
 * Direct selector to the issueDetailsPage state domain
 */
const selectIssueDetailsPageDomain = () => (state) => state.get('issueDetailsPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by IssueDetailsPage
 */

const makeSelectIssueDetailsPage = () => createSelector(
  selectIssueDetailsPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectIssueDetailsPage;
export {
  selectIssueDetailsPageDomain,
};
