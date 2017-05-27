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
import makeSelectIssueDetailsPage from './selectors';
import { getIssueRequest } from './actions';
import { makeSelectAuthUser } from '../NewIssuePage/selectors';


export class IssueDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.dispatch(getIssueRequest(this.props.params.issueID));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authUser !== this.props.authUser) {
      this.props.dispatch(getIssueRequest(this.props.params.issueID));
    }
  }
  render() {
    const { issue, error, currentlySending } = this.props.IssueDetailsPage;
    const { issueID } = this.props.params;
    console.log(issue);
    return (
      <div className="mdl-cell mdl-cell--9-col mdl-cell--9-tablet">
        { currentlySending || error || (issue && issue.id !== parseInt(issueID, 10)) ?
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
                  style={{ backgroundColor: 'grey' }}
                >
                  <b>Issue #{issue.id}</b>
                  <br />
                  Issue #0 + status                Change status + attach + edit + delete
                </div>
                <div
                  className="mdl-cell mdl-cell--8-col"
                  style={{ backgroundColor: 'red' }}
                >
                  Title + description + creator + creation date + attachments
                </div>
                <div
                  className="mdl-cell mdl-cell--4-col"
                  style={{ backgroundColor: 'yellow' }}
                >
                  Details table + vote + watch
                </div>
                <div
                  className="mdl-cell mdl-cell--8-col"
                >
                  <h5>Comments (2)</h5>
                  <div>
                  </div>
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
  authUser: PropTypes.number,
};

const mapStateToProps = createStructuredSelector({
  IssueDetailsPage: makeSelectIssueDetailsPage(),
  authUser: makeSelectAuthUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IssueDetailsPage);
