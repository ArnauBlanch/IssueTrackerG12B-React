/*
 *
 * CommentsSection
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { FlatButton } from 'material-ui';
import { createStructuredSelector } from 'reselect';
import makeSelectCommentsSection from './selectors';
import IssueComment from '../../components/IssueComment';
import CommentForm from '../../components/CommentForm';
import { clearCommentError, createCommentRequest, deleteComment } from './actions';

export class CommentsSection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { creatingComment: false, commentEmpty: false };
    this.cancelCreateComment = this.cancelCreateComment.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }
  cancelCreateComment() {
    this.props.dispatch(clearCommentError());
    this.setState({ creatingComment: false, commentEmpty: false });
  }
  handleCreate(values) {
    if (values.get('comment')) {
      this.setState({ commentEmpty: false });
      this.props.dispatch(createCommentRequest(
        this.props.issue.id,
        { body: values.get('comment') }
      ));
      this.setState({ creatingComment: false });
    } else {
      this.setState({ commentEmpty: true });
    }
  }

  render() {
    const { issue, isAuthenticated } = this.props;
    const { sendingComment, commentError } = this.props.CommentsSection;
    return (
      <div>
        <h5>Comments ({issue._embedded.comments.length})</h5>
        <div style={{ marginBottom: 20 }}>
          { issue._embedded.comments.map((c, index) => (
            <IssueComment
              key={index}
              comment={c}
              isAuthenticated={isAuthenticated}
              onDelete={() => this.props.dispatch(deleteComment(c._links.self.href))}
            />
          ))}
        </div>
        { isAuthenticated && (this.state.creatingComment || sendingComment || commentError) ?
          <CommentForm
            onSubmit={this.handleCreate}
            onCancel={this.cancelCreateComment}
            commentError={commentError}
            commentEmpty={this.state.commentEmpty}
          />
          : (
            <FlatButton
              label="New comment"
              primary
              onTouchTap={() => this.setState({ creatingComment: true })}
            />
          )
        }
      </div>
    );
  }
}

CommentsSection.propTypes = {
  issue: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  CommentsSection: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  CommentsSection: makeSelectCommentsSection(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentsSection);
