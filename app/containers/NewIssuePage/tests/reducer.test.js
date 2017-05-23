
import { fromJS } from 'immutable';
import newIssuePageReducer from '../reducer';

describe('newIssuePageReducer', () => {
  it('returns the initial state', () => {
    expect(newIssuePageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
