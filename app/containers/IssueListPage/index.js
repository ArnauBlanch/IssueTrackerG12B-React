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
import makeSelectIssueListPage from './selectors';

export class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
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
          <TableBody displayRowCheckbox={false}></TableBody>
        </Table>
      </div>
    );
  }
}

IssueListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  IssueListPage: makeSelectIssueListPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueListPage);
