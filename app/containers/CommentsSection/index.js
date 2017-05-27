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
import { clearCreateError, createCommentRequest, editCommentRequest, deleteComment, clearEditError } from './actions';

export class CommentsSection extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      commentEmpty: false,
      editingComment: undefined,
    };
    this.cancelCreateComment = this.cancelCreateComment.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.askForPermissionToEdit = this.askForPermissionToEdit.bind(this);
  }
  cancelCreateComment() {
    this.props.dispatch(clearCreateError());
    this.setState({ commentEmpty: false });
    this.askForPermissionToEdit(-1);
  }
  handleCreate(values) {
    if (values.get('comment')) {
      this.setState({ commentEmpty: false });
      this.props.dispatch(createCommentRequest(
        this.props.issue.id,
        { body: values.get('comment') }
      ));
      this.askForPermissionToEdit(-1);
    } else {
      this.setState({ commentEmpty: true });
    }
  }

  askForPermissionToEdit(commentID) {
    if (typeof this.state.editingComment === 'undefined') {
      this.setState({ editingComment: commentID });
    } else if (this.state.editingComment === commentID) {
      this.setState({ editingComment: undefined });
    }
  }

  render() {
    const { issue, isAuthenticated } = this.props;
    const { sendingComment, createError, editError } = this.props.CommentsSection;
    return (
      <div>
        <h5>Comments ({issue._embedded.comments.length})</h5>
        <div style={{ marginBottom: 20 }}>
          { issue._embedded.comments.map((c, index) => (
            <IssueComment
              key={index}
              comment={c}
              isAuthenticated={isAuthenticated}
              commentError={editError}
              onEdit={
                (editedC) => this.props.dispatch(editCommentRequest(
                c._links.self.href, editedC))
              }
              onClearEdit={() => this.props.dispatch(clearEditError())}
              onDelete={() => this.props.dispatch(deleteComment(c._links.self.href))}
              askForPermissionToEdit={() => this.askForPermissionToEdit(c.id)}
              canEdit={typeof this.state.editingComment === 'undefined'}
              isEditing={this.state.editingComment ? this.state.editingComment === c.id : false}
            />
          ))}
        </div>
        { isAuthenticated && ((typeof this.state.editingComment !== 'undefined' &&
        this.state.editingComment === -1) || sendingComment || createError) ?
          <CommentForm
            form="createComment"
            onSubmit={this.handleCreate}
            onCancel={this.cancelCreateComment}
            commentError={createError}
            commentEmpty={this.state.commentEmpty}
          />
          : (
            <FlatButton
              label="New comment"
              primary
              onTouchTap={() => this.askForPermissionToEdit(-1)}
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
