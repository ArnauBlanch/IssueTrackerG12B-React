import { createSelector } from 'reselect';

/**
 * Direct selector to the commentsSection state domain
 */
const selectCommentsSectionDomain = () => (state) => state.get('comments');

/**
 * Other specific selectors
 */


/**
 * Default selector used by CommentsSection
 */

const makeSelectCommentsSection = () => createSelector(
  selectCommentsSectionDomain(),
  (substate) => substate.toJS()
);

export default makeSelectCommentsSection;
export {
  selectCommentsSectionDomain,
};
