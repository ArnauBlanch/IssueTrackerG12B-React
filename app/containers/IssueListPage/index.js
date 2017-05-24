/*
 *
 * IssueListPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { Chip, FloatingActionButton, Avatar } from 'material-ui';
import { getIssuesRequest } from './actions';
import makeSelectIssueListPage from './selectors';
import KindIcon from '../../components/KindIcon';
import PriorityIcon from '../../components/PriorityIcon';
import StatusLabel from '../../components/StatusLabel';
import BadgeNumber from '../../components/BadgeNumber';

export class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(getIssuesRequest());
  }

  render() {
    const { issues } = this.props.issuesState;
    const titleWidth = { width: '456px' };
    const columnIconWidth = { width: '48px' };
    const statusWidth = { width: '128px' };
    const votesWidth = { width: '72px' };
    const columnTextWidth = { width: '182px' };
    const styles = {
      chip: {
        margin: 4,
      },
      wrapper: {
        display: 'flex',
        flexWrap: 'wrap',
      },
    };
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
              <TableHeaderColumn style={titleWidth}>Title</TableHeaderColumn>
              <TableHeaderColumn style={columnIconWidth}>T</TableHeaderColumn>
              <TableHeaderColumn style={columnIconWidth}>P</TableHeaderColumn>
              <TableHeaderColumn style={statusWidth}>S</TableHeaderColumn>
              <TableHeaderColumn style={votesWidth}>Votes</TableHeaderColumn>
              <TableHeaderColumn style={columnTextWidth}>Assignee</TableHeaderColumn>
              <TableHeaderColumn style={columnTextWidth}>Created</TableHeaderColumn>
              <TableHeaderColumn style={columnTextWidth}>Updated</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false} showRowHover>
            {
              issues && issues.map((issue) => (
                <TableRow selectable={false}>
                  <TableRowColumn style={titleWidth}>
                    <Link to={`/issues/${issue.id}`} style={{ textDecoration: 'none' }}>
                      {`#${issue.id}: ${issue.title}`}
                    </Link>
                  </TableRowColumn>
                  <TableRowColumn style={columnIconWidth}><KindIcon kind={issue.kind} /></TableRowColumn>
                  <TableRowColumn style={columnIconWidth}><PriorityIcon priority={issue.priority} /></TableRowColumn>
                  <TableRowColumn style={statusWidth}><StatusLabel status={issue.status} /></TableRowColumn>
                  <TableRowColumn style={votesWidth}>
                    { issue.votes > 0 && <BadgeNumber number={issue.votes} voted={issue.voted_by_auth_user} /> }
                  </TableRowColumn>
                  <TableRowColumn style={columnTextWidth}>
                    { issue._links.assignee && issue._links.assignee.name }
                  </TableRowColumn>
                  <TableRowColumn style={columnTextWidth}>{`${issue.created_at}`}</TableRowColumn>
                  <TableRowColumn style={columnTextWidth}>{`${issue.updated_at}`}</TableRowColumn>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

        <FloatingActionButton
          style={{ right: 30, bottom: 30, position: 'fixed' }}
          onTouchTap={() => this.props.dispatch(push('/issues/new'))}
        >
          <ContentAdd />
        </FloatingActionButton>
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
