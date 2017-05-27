/*
 *
 * IssueDetailsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { CircularProgress, Card, FlatButton, DropDownMenu, MenuItem, Dialog } from 'material-ui';
import { createStructuredSelector } from 'reselect';
import { getIssueRequest, voteIssue, watchIssue } from './actions';
import { makeSelectAuthState } from '../IssueListPage/selectors';
import CommentsSection from '../CommentsSection';
import makeSelectIssueDetailsPage from './selectors';
import StatusLabel from '../../components/StatusLabel';
import UserAvatar from '../../components/UserAvatar';
import KindIcon from '../../components/KindIcon';
import PriorityIcon from '../../components/PriorityIcon';
import BadgeNumber from '../../components/BadgeNumber';


export class IssueDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getIssueRequest(this.props.params.issueID));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authState.authUser !== this.props.authState.authUser) {
      this.props.dispatch(getIssueRequest(this.props.params.issueID));
    }
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const { issue, error, currentlySending } = this.props.IssueDetailsPage;
    const { issueID } = this.props.params;
    const { isAuthenticated } = this.props.authState;
    return (
      <div className="mdl-cell mdl-cell--9-col mdl-cell--9-tablet">
        { (currentlySending && (!issue || issue.id !== parseInt(issueID, 10)))
          || error || (issue && issue.id !== parseInt(issueID, 10)) ?
            <div>
              { !error ? <CircularProgress size={60} thickness={6} />
                : <h5 style={{ color: 'red', fontWeight: 700 }}>
                  There was an error when fetching the issue
                </h5>
              }
            </div>
          : issue && <div>
            <Helmet
              title={`Issue Tracker | ${'hello'}`}
              meta={[
                { name: 'description', content: 'Description of IssueDetailsPage' },
              ]}
            />
            <Card
              style={{ marginBottom: 60 }}
            >
              <div className="mdl-grid">
                <div
                  className="mdl-cell mdl-cell--12-col"
                >
                  <b style={{ marginRight: 10 }}>Issue #{issue.id}</b>
                  <StatusLabel status={issue.status} />
                  <div style={{ float: 'right' }}>

                    <DropDownMenu
                      value={0}
                      labelStyle={{ fontWeight: 500 }}
                      style={{ marginLeft: 10 }}
                      /* href={`/issues/${issue.id}/edit`} */
                    >
                      <MenuItem value={0} primaryText="Workflow" hidden="true" />
                      {issue.status !== 'new_issue' && <MenuItem value="new_issue" primaryText="new" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'open' && <MenuItem value="open" primaryText="open" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'on_hold' && <MenuItem value="on_hold" primaryText="on hold" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'resolved' && <MenuItem value="resolved" primaryText="resolved" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'duplicate' && <MenuItem value="duplicate" primaryText="duplicate" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'invalid_issue' && <MenuItem value="invalid_issue" primaryText="invalid" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'wontfix' && <MenuItem value="wontfix" primaryText="wontfix" onClick={this.handleDialogOpen} />}
                      {issue.status !== 'closed' && <MenuItem value="closed" primaryText="closed" onClick={this.handleDialogOpen} />}
                    </DropDownMenu>

                    <Dialog
                      title="Title"
                      open={this.state.dialogOpen}
                      onRequestClose={this.state.handleDialogClose}
                    >
                    </Dialog>

                    <FlatButton
                      label="Attach"
                      labelStyle={{ fontWeight: 500 }}
                      style={{ marginLeft: 10 }}
                      /* href={`/issues/${issue.id}/edit`} */
                    />

                    <FlatButton
                      label="Edit"
                      labelStyle={{ fontWeight: 500 }}
                      style={{ marginLeft: 10 }}
                      href={`/issues/${issue.id}/edit`}
                    />
                  </div>
                </div>
                <div
                  className="mdl-cell mdl-cell--8-col"
                  style={{ backgroundColor: 'red' }}
                >
                  Title + description + creator + creation date + attachments
                </div>
                <div
                  className="mdl-cell mdl-cell--4-col"
                >
                  <div style={{ display: 'flex', width: '100%' }}>
                    <div style={{ paddingTop: 5, flex: 'none', width: '120px', fontWeight: 'bold', textAlign: 'right', paddingRight: 15 }}>
                      Assignee
                    </div>
                    <div style={{ flex: 'none', width: '173px' }}>
                      <UserAvatar name={issue._links.assignee.name} imageUrl={issue._links.assignee.image.href} />
                    </div>
                  </div>

                  <div style={{ height: '28px', display: 'flex', width: '100%', marginTop: 5 }}>
                    <div style={{ paddingTop: 3, flex: 'none', width: '120px', fontWeight: 'bold', textAlign: 'right', paddingRight: 15 }}>
                      Type
                    </div>
                    <div style={{ paddingTop: 3, flex: 'none', width: '173px' }}>
                      <KindIcon kind={issue.kind} />
                      <span style={{ marginLeft: 5 }}>{issue.kind}</span>
                    </div>
                  </div>

                  <div style={{ height: '28px', display: 'flex', width: '100%' }}>
                    <div style={{ paddingTop: 3, flex: 'none', width: '120px', fontWeight: 'bold', textAlign: 'right', paddingRight: 15 }}>
                      Priority
                    </div>
                    <div style={{ paddingTop: 3, flex: 'none', width: '173px' }}>
                      <PriorityIcon priority={issue.priority} />
                      <span style={{ marginLeft: 5 }}>{issue.priority}</span>
                    </div>
                  </div>

                  <div style={{ height: '28px', display: 'flex', width: '100%' }}>
                    <div style={{ paddingTop: 3, flex: 'none', width: '120px', fontWeight: 'bold', textAlign: 'right', paddingRight: 15 }}>
                      Status
                    </div>
                    <div style={{ paddingTop: 3, flex: 'none', width: '173px' }}>
                      <StatusLabel status={issue.status} />
                    </div>
                  </div>

                  <div style={{ height: '28px', display: 'flex', width: '100%' }}>
                    <div style={{ paddingTop: 3, flex: 'none', width: '120px', fontWeight: 'bold', textAlign: 'right', paddingRight: 15 }}>
                      Votes
                    </div>
                    <div style={{ paddingTop: 3, flex: 'none', width: '173px' }}>
                      <BadgeNumber number={issue.votes} focused={issue.voted_by_current_user} />
                      <a
                        style={{ marginLeft: '5' }}
                        onClick={() => this.props.dispatch(voteIssue(issue.id))}
                        role="link"
                      >
                        {issue.voted_by_current_user ? 'Remove vote' : 'Vote for this issue'}
                      </a>
                    </div>
                  </div>

                  <div style={{ height: '28px', display: 'flex', width: '100%' }}>
                    <div style={{ paddingTop: '3', flex: 'none', width: '120px', fontWeight: 'bold', textAlign: 'right', paddingRight: '15' }}>
                      Watchers
                    </div>
                    <div style={{ paddingTop: '3', flex: 'none', width: '173px' }}>
                      <BadgeNumber number={issue.watchers} focused={issue.watched_by_current_user} />
                      <a
                        style={{ marginLeft: '5' }}
                        onClick={() => this.props.dispatch(watchIssue(issue.id))}
                        role="link"
                      >
                        {issue.watched_by_current_user ? 'Stop watching' : 'Watch this issue'}
                      </a>
                    </div>
                  </div>

                </div>
                <div
                  className="mdl-cell mdl-cell--8-col"
                >
                  <CommentsSection
                    issue={issue}
                    isAuthenticated={isAuthenticated}
                  />
                </div>
              </div>
            </Card>
          </div>
        }
      </div>
    );
  }
}

IssueDetailsPage.propTypes = {
  IssueDetailsPage: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  authState: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  IssueDetailsPage: makeSelectIssueDetailsPage(),
  authState: makeSelectAuthState(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailsPage);
