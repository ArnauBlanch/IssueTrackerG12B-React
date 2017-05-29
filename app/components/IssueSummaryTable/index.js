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
    const leftColumnStyle = {
      paddingTop: '3px',
      fontWeight: 'bold',
      textAlign: 'right',
      paddingRight: '15px',
    };
    const rightColumnStyle = {
      paddingTop: '3px',
      width: '100%',
      maxWidth: 0,
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    };
    const rowStyle = {
      height: '28px',
      width: '100%',
    };

    return (
      <table style={{ width: '100%' }}>
        <tbody>
          { issue._links.assignee &&
            <tr style={rowStyle}>
              <td style={leftColumnStyle}>
                Assignee
              </td>
              <td style={rightColumnStyle}>
                <UserAvatar name={issue._links.assignee.name} imageUrl={issue._links.assignee.image.href} />
              </td>
            </tr>
          }

          <tr style={rowStyle}>
            <td style={leftColumnStyle}>
              Type
            </td>
            <td style={rightColumnStyle}>
              <KindIcon kind={issue.kind} />
              <span style={{ marginLeft: 5 }}>{issue.kind}</span>
            </td>
          </tr>
          <tr style={rowStyle}>
            <td style={leftColumnStyle}>
              Priority
            </td>
            <td style={rightColumnStyle}>
              <PriorityIcon priority={issue.priority} />
              <span style={{ marginLeft: 5 }}>{issue.priority}</span>
            </td>
          </tr>

          <tr style={rowStyle}>
            <td style={leftColumnStyle}>
              Status
            </td>
            <td style={rightColumnStyle}>
              <StatusLabel status={issue.status} />
            </td>
          </tr>

          <tr style={rowStyle}>
            <td style={leftColumnStyle}>
              Votes
            </td>
            <td style={rightColumnStyle}>
              <BadgeNumber number={issue.votes} focused={issue.voted_by_current_user} />
              { this.props.isAuthenticated &&
                <a // eslint-disable-line
                  style={{ marginLeft: 10 }}
                  onClick={() => this.props.dispatch(voteIssue(issue.id))}
                  role="link"
                >
                  {issue.voted_by_current_user ? 'Remove vote' : 'Vote for this issue'}
                </a>
              }
            </td>
          </tr>

          <tr style={rowStyle}>
            <td style={leftColumnStyle}>
              Watchers
            </td>
            <td style={rightColumnStyle}>
              <BadgeNumber number={issue.watchers} focused={issue.watched_by_current_user} />
              { this.props.isAuthenticated &&
                <a // eslint-disable-line
                  style={{ marginLeft: 10 }}
                  onClick={() => this.props.dispatch(watchIssue(issue.id))}
                  role="link"
                >
                  {issue.watched_by_current_user ? 'Stop watching' : 'Watch this issue'}
                </a>
              }
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

IssueSummaryTable.propTypes = {
  issue: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapDispatchToProps)(IssueSummaryTable);
