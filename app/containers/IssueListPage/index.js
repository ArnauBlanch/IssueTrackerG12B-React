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
import { FloatingActionButton, Card, CircularProgress } from 'material-ui';
import { FormattedRelative, FormattedDate } from 'react-intl';
import { getIssuesRequest } from './actions';
import KindIcon from '../../components/KindIcon';
import PriorityIcon from '../../components/PriorityIcon';
import StatusLabel from '../../components/StatusLabel';
import BadgeNumber from '../../components/BadgeNumber';
import UserAvatar from '../../components/UserAvatar';
import makeSelectIssueListPage, { makeSelectAuthState } from './selectors';

export class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(getIssuesRequest());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authState.authUser !== nextProps.authState.authUser) {
      this.props.dispatch(getIssuesRequest());
    }
  }

  render() {
    const { issues } = this.props.issuesState;
    const titleWidth = { paddingLeft: 5, paddingRight: 0 };
    const columnIconWidth = { width: 45, textAlign: 'center', paddingLeft: 0, paddingRight: 0 };
    const statusWidth = { width: 80, textAlign: 'center', paddingLeft: 0, paddingRight: 0 };
    const votesWidth = { width: 45, textAlign: 'center', paddingLeft: 0, paddingRight: 0 };
    const assigneeWidth = { width: '25%', textAlign: 'center', overflow: 'ellipsis' };
    const dateWidth = { width: 90, textAlign: 'center', paddingLeft: 0, paddingRight: 0 };
    const cardStyle = {
      margin: 10,
      maxWidth: 1000,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 60,
    };
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
        { this.props.issuesState.currentlySending ?
          <CircularProgress size={60} thickness={6} />
          : <Card style={cardStyle}>
            <Table>
              <TableHeader displaySelectAll={false} adjustForCheckbox={false} style={{ paddingRight: 20 }}>
                <TableRow>
                  <TableHeaderColumn style={titleWidth}>Title</TableHeaderColumn>
                  <TableHeaderColumn style={columnIconWidth}>Kind</TableHeaderColumn>
                  <TableHeaderColumn style={columnIconWidth}>Priority</TableHeaderColumn>
                  <TableHeaderColumn style={statusWidth}>Status</TableHeaderColumn>
                  <TableHeaderColumn className="mdl-cell--hide-phone" style={votesWidth}>Votes</TableHeaderColumn>
                  <TableHeaderColumn className="mdl-cell--hide-phone mdl-cell--hide-tablet" style={assigneeWidth}>Assignee</TableHeaderColumn>
                  <TableHeaderColumn className="mdl-cell--hide-phone" style={dateWidth}>Created</TableHeaderColumn>
                  <TableHeaderColumn className="mdl-cell--hide-tablet mdl-cell--hide-phone" style={dateWidth}>Updated</TableHeaderColumn>
                </TableRow>
              </TableHeader>
              <TableBody displayRowCheckbox={false} showRowHover>
                {
                  issues && issues.map((issue) => (
                    <TableRow key={issue.id} selectable={false}>
                      <TableRowColumn style={titleWidth}>
                        <Link to={`/issues/${issue.id}`} style={{ textDecoration: 'none', fontSize: 14 }}>
                          {`#${issue.id}: ${issue.title}`}
                        </Link>
                      </TableRowColumn>
                      <TableRowColumn style={columnIconWidth}><KindIcon kind={issue.kind} /></TableRowColumn>
                      <TableRowColumn style={columnIconWidth}><PriorityIcon priority={issue.priority} /></TableRowColumn>
                      <TableRowColumn style={statusWidth}><StatusLabel status={issue.status} /></TableRowColumn>
                      <TableRowColumn className="mdl-cell--hide-phone" style={votesWidth}>
                        { issue.votes > 0 && <BadgeNumber number={issue.votes} voted={issue.voted_by_current_user} /> }
                      </TableRowColumn>
                      <TableRowColumn style={assigneeWidth} className="mdl-cell--hide-phone mdl-cell--hide-tablet">
                        { issue._links.assignee &&
                          <UserAvatar
                            name={issue._links.assignee.name}
                            imageUrl={issue._links.assignee.image ? issue._links.assignee.image.href : null}
                          />
                        }
                      </TableRowColumn>
                      <TableRowColumn className="mdl-cell--hide-phone" style={dateWidth}>
                        {
                          now.getTime() - (new Date(issue.created_at)).getTime() <= milisecInDay * 2 ?
                            <FormattedRelative value={issue.created_at} />
                          : <FormattedDate value={issue.created_at} />
                        }
                      </TableRowColumn>
                      <TableRowColumn className="mdl-cell--hide-phone mdl-cell--hide-tablet" style={dateWidth}>
                        {
                          now.getTime() - (new Date(issue.updated_at)).getTime() <= milisecInDay * 2 ?
                            <FormattedRelative value={issue.updated_at} />
                          : <FormattedDate value={issue.updated_at} />
                        }
                      </TableRowColumn>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Card>
        }
        { this.props.authState.isAuthenticated &&
          <FloatingActionButton
            style={{ right: 20, bottom: 20, position: 'fixed' }}
            onTouchTap={() => this.props.dispatch(push('/issues/new'))}
          >
            <ContentAdd />
          </FloatingActionButton>
        }
      </div>
    );
  }
}

IssueListPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  issuesState: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  issuesState: makeSelectIssueListPage(),
  authState: makeSelectAuthState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueListPage);
