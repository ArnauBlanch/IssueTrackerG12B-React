/**
*
* IssueSummaryTable
*
*/

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { voteIssue, watchIssue } from '../../containers/IssueDetailsPage/actions';
import StatusLabel from '../StatusLabel';
import UserAvatar from '../UserAvatar';
import KindIcon from '../KindIcon';
import PriorityIcon from '../PriorityIcon';
import BadgeNumber from '../BadgeNumber';


class IssueSummaryTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const issue = this.props.issue;
    const assigneeLeftColumnStyle = {
      paddingTop: '5px',
      flex: 'none',
      width: '120px',
      fontWeight: 'bold',
      textAlign: 'right',
      paddingRight: '15px',
    };
    const leftColumnStyle = {
      paddingTop: '3px',
      flex: 'none',
      width: '120px',
      fontWeight: 'bold',
      textAlign: 'right',
      paddingRight: '15px',
    };
    const rightColumnStyle = {
      paddingTop: '3px',
      flex: 'none',
      width: '173px',
    };
    const rowStyle = {
      height: '28px',
      display: 'flex',
      width: '100%',
    };

    return (
      <div>
        <div style={issue._links.assignee ? { display: 'flex', width: '100%' } : rowStyle}>
          <div style={issue._links.assignee ? assigneeLeftColumnStyle : leftColumnStyle}>
            Assignee
          </div>
          <div style={issue._links.assignee ? { flex: 'none', width: '173px' } : rightColumnStyle}>
            {
              issue._links.assignee ?
                <UserAvatar name={issue._links.assignee.name} imageUrl={issue._links.assignee.image.href} /> :
                <i style={{ color: '#767' }}>Not assigned.</i>
            }
          </div>
        </div>

        <div style={issue._links.assignee ? { height: '28px', display: 'flex', width: '100%', marginTop: 5 } : rowStyle}>
          <div style={leftColumnStyle}>
            Type
          </div>
          <div style={rightColumnStyle}>
            <KindIcon kind={issue.kind} />
            <span style={{ marginLeft: 5 }}>{issue.kind}</span>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={leftColumnStyle}>
            Priority
          </div>
          <div style={rightColumnStyle}>
            <PriorityIcon priority={issue.priority} />
            <span style={{ marginLeft: 5 }}>{issue.priority}</span>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={leftColumnStyle}>
            Status
          </div>
          <div style={rightColumnStyle}>
            <StatusLabel status={issue.status} />
          </div>
        </div>

        <div style={rowStyle}>
          <div style={leftColumnStyle}>
            Votes
          </div>
          <div style={rightColumnStyle}>
            <BadgeNumber number={issue.votes} focused={issue.voted_by_current_user} />
            <a
              style={{ marginLeft: '5px' }}
              onClick={() => this.props.dispatch(voteIssue(issue.id))}
              role="link"
            >
              {issue.voted_by_current_user ? 'Remove vote' : 'Vote for this issue'}
            </a>
          </div>
        </div>

        <div style={rowStyle}>
          <div style={leftColumnStyle}>
            Watchers
          </div>
          <div style={rightColumnStyle}>
            <BadgeNumber number={issue.watchers} focused={issue.watched_by_current_user} />
            <a
              style={{ marginLeft: '5px' }}
              onClick={() => this.props.dispatch(watchIssue(issue.id))}
              role="link"
            >
              {issue.watched_by_current_user ? 'Stop watching' : 'Watch this issue'}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

IssueSummaryTable.propTypes = {
  issue: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(IssueSummaryTable);
