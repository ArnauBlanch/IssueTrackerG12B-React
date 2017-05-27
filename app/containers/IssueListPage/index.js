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
import { FloatingActionButton, Card, CircularProgress } from 'material-ui';
import { getIssuesRequest } from './actions';
import makeSelectIssueListPage, { makeSelectAuthState } from './selectors';
import IssuesTable from '../../components/IssuesTable';

class IssueListPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
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
    const cardStyle = {
      margin: 10,
      maxWidth: 1000,
      paddingLeft: 10,
      paddingRight: 10,
      marginBottom: 60,
    };

    return (
      <div>
        <Helmet
          title="Issue Tracker"
          meta={[
            { name: 'description', content: 'Issue Tracker - ASW' },
          ]}
        />
        { this.props.issuesState.currentlySending ?
          <CircularProgress size={60} thickness={6} />
          : <Card style={cardStyle}>
            <IssuesTable issues={issues} />
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
