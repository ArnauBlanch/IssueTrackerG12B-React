/*
 *
 * IssueListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import { getIssuesRequest } from './actions';
import makeSelectIssueListPage from './selectors';

export class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.props.dispatch(getIssuesRequest());
  }
  render() {
    const { issues } = this.props.issuesState;
    console.log(issues);
    return (
      <div>
        <Helmet
          title="Issue Tracker"
          meta={[
            { name: 'description', content: 'Description of IssueListPage' },
          ]}
        />
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Title</TableHeaderColumn>
              <TableHeaderColumn>T</TableHeaderColumn>
              <TableHeaderColumn>P</TableHeaderColumn>
              <TableHeaderColumn>S</TableHeaderColumn>
              <TableHeaderColumn>Votes</TableHeaderColumn>
              <TableHeaderColumn>Assignee</TableHeaderColumn>
              <TableHeaderColumn>Created</TableHeaderColumn>
              <TableHeaderColumn>Updated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {
              issues && issues.map((issue) => (
                <TableRow>
                  <TableRowColumn>{`#${issue.id}: ${issue.title}`}</TableRowColumn>
                  <TableRowColumn>{`${issue.kind}`}</TableRowColumn>
                  <TableRowColumn>{`${issue.priority}`}</TableRowColumn>
                  <TableRowColumn>{`${issue.status}`}</TableRowColumn>
                  <TableRowColumn>
                    { issue.votes > 0 && issue.votes }
                  </TableRowColumn>
                  <TableRowColumn>
                    { issue._links.assignee && issue._links.assignee.name }
                  </TableRowColumn>
                  <TableRowColumn>{`${issue.created_at}`}</TableRowColumn>
                  <TableRowColumn>{`${issue.updated_at}`}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}

IssueListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  issuesState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  issuesState: makeSelectIssueListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueListPage);
