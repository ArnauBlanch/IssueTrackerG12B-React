import { createSelector } from 'reselect';

/**
 * Direct selector to the issueListPage state domain
 */
const selectIssueListPageDomain = () => (state) => state.get('issueListPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by IssueListPage
 */
const makeSelectAuthState = () => (state) => state.get('auth').toJS();

const makeSelectIssueListPage = () => createSelector(
  selectIssueListPageDomain(),
  (substate) => substate.toJS()
);

export default makeSelectIssueListPage;
export {
  selectIssueListPageDomain,
  makeSelectAuthState,
};
