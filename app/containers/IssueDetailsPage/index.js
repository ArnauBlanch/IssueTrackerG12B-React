/*
 *
 * IssueDetailsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { CircularProgress, Card } from 'material-ui';
import { createStructuredSelector } from 'reselect';
import { getIssueRequest } from './actions';
import { makeSelectAuthState } from '../IssueListPage/selectors';
import CommentsSection from '../CommentsSection';
import makeSelectIssueDetailsPage from './selectors';
import IssueDetailsHeader from '../../components/IssueDetailsHeader';
import IssueSummaryTable from '../../components/IssueSummaryTable';


export class IssueDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(getIssueRequest(this.props.params.issueID));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authState.authUser !== this.props.authState.authUser) {
      this.props.dispatch(getIssueRequest(this.props.params.issueID));
    }
  }

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

                <div className="mdl-cell mdl-cell--12-col">
                  <IssueDetailsHeader id={issue.id} status={issue.status} />
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
                  <IssueSummaryTable issue={issue} />
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
