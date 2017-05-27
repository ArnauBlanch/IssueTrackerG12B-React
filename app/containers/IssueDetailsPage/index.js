/*
 *
 * IssueDetailsPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { CircularProgress, Card, FlatButton } from 'material-ui';
import { createStructuredSelector } from 'reselect';
import makeSelectIssueDetailsPage from './selectors';
import { getIssueRequest, deleteComment } from './actions';
import { makeSelectAuthState } from '../IssueListPage/selectors';
import IssueComment from '../../components/IssueComment';
import CommentForm from '../../components/CommentForm';


export class IssueDetailsPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { newComment: false };
    this.deleteComment = this.deleteComment.bind(this);
    this.toggleNewComment = this.toggleNewComment.bind(this);
    this.createComment = this.createComment.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getIssueRequest(this.props.params.issueID));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.authState.authUser !== this.props.authState.authUser) {
      this.props.dispatch(getIssueRequest(this.props.params.issueID));
    }
  }

  toggleNewComment() {
    this.setState({ newComment: !this.state.newComment });
  }
  createComment(values) {
    console.log(values.get('comment'));
    this.setState({ newComment: false });
  }

  deleteComment(commentUrl) {
    this.props.dispatch(deleteComment(commentUrl));
  }

  render() {
    const { issue, error, currentlySending } = this.props.IssueDetailsPage;
    const { issueID } = this.props.params;
    // console.log(issue);
    // console.log(this.state.newComment);
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
                  className="mdl-cell mdl-cell--7-col"
                >
                  <h5>Comments ({issue._embedded.comments.length})</h5>
                  <div>
                    { issue._embedded.comments.map((c, index) => (
                      <IssueComment
                        key={index}
                        comment={c}
                        isAuthenticated={this.props.authState.isAuthenticated}
                        onDelete={() => this.deleteComment(c._links.self.href)}
                      />
                    ))}
                  </div>
                  { this.state.newComment ?
                    <CommentForm
                      onSubmit={this.createComment}
                      onCancel={this.toggleNewComment}
                    />
                    : <FlatButton label="New comment" primary onTouchTap={this.toggleNewComment} />
                  }
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
