/**
*
* IssueRow
*
*/

import React, { PropTypes } from 'react';
import { TableRow, TableRowColumn } from 'material-ui';
import { Link } from 'react-router';
import { FormattedDate, FormattedRelative } from 'react-intl';
import { titleStyle, iconStyle, statusStyle, assigneeStyle, votesStyle, dateStyle } from '../tableStyle';
import BadgeNumber from '../BadgeNumber';
import UserAvatar from '../UserAvatar';
import KindIcon from '../KindIcon';
import PriorityIcon from '../PriorityIcon';
import StatusLabel from '../StatusLabel';

class IssueRow extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const milisecInDay = 86400000;
    const now = new Date();
    const { issue } = this.props;

    return (
      <TableRow selectable={false}>
        <TableRowColumn style={titleStyle}>
          <Link to={`/issues/${issue.id}`} style={{ textDecoration: 'none', fontSize: 14 }}>
            {`#${issue.id}: ${issue.title}`}
          </Link>
        </TableRowColumn>
        <TableRowColumn style={iconStyle}><KindIcon kind={issue.kind} /></TableRowColumn>
        <TableRowColumn style={iconStyle}><PriorityIcon priority={issue.priority} /></TableRowColumn>
        <TableRowColumn style={statusStyle}><StatusLabel status={issue.status} /></TableRowColumn>
        <TableRowColumn className="mdl-cell--hide-phone" style={votesStyle}>
          { issue.votes > 0 && <BadgeNumber number={issue.votes} focused={issue.voted_by_current_user} /> }
        </TableRowColumn>
        <TableRowColumn style={assigneeStyle} className="mdl-cell--hide-phone mdl-cell--hide-tablet">
          { issue._links.assignee &&
            <UserAvatar
              name={issue._links.assignee.name}
              imageUrl={issue._links.assignee.image ? issue._links.assignee.image.href : null}
            />
          }
        </TableRowColumn>
        <TableRowColumn className="mdl-cell--hide-phone" style={dateStyle}>
          {
            now.getTime() - (new Date(issue.created_at)).getTime() <= milisecInDay * 2 ?
              <FormattedRelative value={issue.created_at} />
            : <FormattedDate value={issue.created_at} />
          }
        </TableRowColumn>
        <TableRowColumn className="mdl-cell--hide-phone mdl-cell--hide-tablet" style={dateStyle}>
          {
            now.getTime() - (new Date(issue.updated_at)).getTime() <= milisecInDay * 2 ?
              <FormattedRelative value={issue.updated_at} />
            : <FormattedDate value={issue.updated_at} />
          }
        </TableRowColumn>
      </TableRow>
    );
  }
}

IssueRow.propTypes = {
  issue: PropTypes.object.isRequired,
};

export default IssueRow;
