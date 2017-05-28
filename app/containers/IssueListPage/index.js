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
import ContentAdd from 'material-ui/svg-icons/content/add';
import { FloatingActionButton, Card, CircularProgress, RaisedButton } from 'material-ui';
import { getIssuesRequest } from './actions';
import makeSelectIssueListPage, { makeSelectAuthState } from './selectors';
import IssuesTable from '../../components/IssuesTable';
import ApiUsers from '../../utils/ApiUsers';

class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { currentFilter: 'open' };
  }

  componentWillMount() {
    this.props.dispatch(getIssuesRequest());
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.authState.authUser !== nextProps.authState.authUser) {
      this.props.dispatch(getIssuesRequest());
    }
  }

  filterOpen() {
    this.setState({ currentFilter: 'open' });
    this.render();
  }

  filterAll() {
    this.setState({ currentFilter: 'all' });
    this.render();
  }

  filterMyIssues() {
    this.setState({ currentFilter: 'my_issues' });
    this.render();
  }

  filterWatching() {
    this.setState({ currentFilter: 'watching' });
    this.render();
  }

  render() {
    let { issues } = this.props.issuesState;
    const { currentlySending } = this.props.issuesState;
    const cardStyle = {
      margin: 10,
      maxWidth: 1000,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 60,
    };

    function openIssues(issue) {
      return issue.status === 'open';
    }

    function myIssues(issue) {
      if (issue._links.assignee) {
        return issue._links.assignee.nickname === ApiUsers[localStorage.getItem('authUser')].nickname;
      }
      return false;
    }

    function watchingIssues(issue) {
      return issue.watched_by_current_user === true;
    }

    if (!currentlySending) {
      if (this.state.currentFilter === 'open') {
        issues = issues.filter(openIssues);
      } else if (this.state.currentFilter === 'my_issues') {
        issues = issues.filter(myIssues);
      } else if (this.state.currentFilter === 'watching') {
        issues = issues.filter(watchingIssues);
      }
    }

    return (
      <div>
        <Helmet
          title="Issue Tracker"
          meta={[
            { name: 'description', content: 'Issue Tracker - ASW' },
          ]}
        />
        { currentlySending || !issues ?
          <CircularProgress size={60} thickness={6} /> :
          <div>
            <div className="mdl-grid">
              <div className="mdl-cell mdl-cell--4-col" style={{ marginLeft: '0px', width: '195px' }}>
                <RaisedButton
                  label="All"
                  labelStyle={{ fontWeight: 'bold' }}
                  onTouchTap={() => this.filterAll()}
                  primary={this.state.currentFilter === 'all'}
                />
                <RaisedButton
                  label="Open" style={{ marginLeft: '15px' }}
                  labelStyle={{ fontWeight: 'bold' }}
                  onTouchTap={() => this.filterOpen()}
                  primary={this.state.currentFilter === 'open'}
                />
              </div>
              <div className="mdl-cell mdl-cell--4-col" style={{ marginLeft: '-12px', width: '240px' }}>
                {
                  this.props.authState.isAuthenticated &&
                  <RaisedButton
                    label="My issues"
                    style={{ marginLeft: '15px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                    onTouchTap={() => this.filterMyIssues()}
                    primary={this.state.currentFilter === 'my_issues'}
                  />
                }
                {
                  this.props.authState.isAuthenticated &&
                  <RaisedButton
                    label="Watching"
                    style={{ marginLeft: '15px' }}
                    labelStyle={{ fontWeight: 'bold' }}
                    onTouchTap={() => this.filterWatching()}
                    primary={this.state.currentFilter === 'watching'}
                  />
                }
              </div>
            </div>
            <Card style={cardStyle}>
              <IssuesTable issues={issues} />
            </Card>
          </div>
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
