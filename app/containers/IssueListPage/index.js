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
import { FloatingActionButton, Card } from 'material-ui';
import { FormattedRelative, FormattedDate } from 'react-intl';
import { getIssuesRequest } from './actions';
import makeSelectIssueListPage from './selectors';
import KindIcon from '../../components/KindIcon';
import PriorityIcon from '../../components/PriorityIcon';
import StatusLabel from '../../components/StatusLabel';
import BadgeNumber from '../../components/BadgeNumber';
import UserAvatar from '../../components/UserAvatar';

export class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(getIssuesRequest());
  }

  render() {
    const { issues } = this.props.issuesState;
    const titleWidth = { maxWidth: '180px' };
    const columnIconWidth = { width: '16px' };
    const statusWidth = { width: '128px' };
    const votesWidth = { width: '72px' };
    const assigneeWidth = { width: '250px' };
    const dateWidth = { width: '140px' };
    const cardStyle = {
      margin: '75px 100px',
    }
    const milisecInDay = 86400000;
    const now = new Date();

    return (
      <div>
        <Helmet
          title="Issue Tracker"
          meta={[
            { name: 'description', content: 'Description of IssueListPage' },
          ]}
        />
        <Card style={cardStyle}>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn style={titleWidth}>Title</TableHeaderColumn>
                <TableHeaderColumn style={columnIconWidth}>T</TableHeaderColumn>
                <TableHeaderColumn style={columnIconWidth}>P</TableHeaderColumn>
                <TableHeaderColumn style={statusWidth}>S</TableHeaderColumn>
                <TableHeaderColumn style={votesWidth}>Votes</TableHeaderColumn>
                <TableHeaderColumn style={assigneeWidth}>Assignee</TableHeaderColumn>
                <TableHeaderColumn style={dateWidth}>Created</TableHeaderColumn>
                <TableHeaderColumn style={dateWidth}>Updated</TableHeaderColumn>
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
                    <TableRowColumn style={assigneeWidth}>
                      { issue._links.assignee &&
                        <UserAvatar
                          name={issue._links.assignee.name}
                          imageUrl={issue._links.assignee.image ? issue._links.assignee.image.href : null}
                        />
                      }
                    </TableRowColumn>
                    <TableRowColumn style={dateWidth}>
                      {
                        now.getTime() - (new Date(issue.created_at)).getTime() <= milisecInDay * 2 ?
                          <FormattedRelative value={issue.created_at} /> :
                          <FormattedDate value={issue.created_at} />
                      }
                    </TableRowColumn>
                    <TableRowColumn style={dateWidth}>
                      {
                        now.getTime() - (new Date(issue.updated_at)).getTime() <= milisecInDay * 2 ?
                          <FormattedRelative value={issue.updated_at} /> :
                          <FormattedDate value={issue.updated_at} />
                      }
                    </TableRowColumn>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </Card>

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
