/**
*
* IssuesTable
*
*/

import React, { PropTypes } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow } from 'material-ui/Table';
import { titleStyle, iconStyle, statusStyle, assigneeStyle, votesStyle, dateStyle } from '../tableStyle';
import IssueRow from '../IssueRow';


class IssuesTable extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { issues } = this.props;
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ paddingRight: 20 }}>
          <TableRow>
            <TableHeaderColumn style={titleStyle}>Title</TableHeaderColumn>
            <TableHeaderColumn style={iconStyle}>Kind</TableHeaderColumn>
            <TableHeaderColumn style={iconStyle}>Priority</TableHeaderColumn>
            <TableHeaderColumn style={statusStyle}>Status</TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell--hide-phone" style={votesStyle}>Votes</TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell--hide-phone mdl-cell--hide-tablet" style={assigneeStyle}>Assignee</TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell--hide-phone" style={dateStyle}>Created</TableHeaderColumn>
            <TableHeaderColumn className="mdl-cell--hide-tablet mdl-cell--hide-phone" style={dateStyle}>Updated</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false} showRowHover>
          {
            issues && issues.map((issue) => (
              <IssueRow key={issue.id} issue={issue} />
            ))
          }
        </TableBody>
      </Table>
    );
  }
}

IssuesTable.propTypes = {
  issues: PropTypes.array.isRequired,
};

export default IssuesTable;
