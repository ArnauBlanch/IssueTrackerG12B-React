/**
*
* Comment
*
*/

import React, { PropTypes } from 'react';
import { Card, CardHeader, CardActions, FlatButton, CardText, Dialog } from 'material-ui';
import { FormattedRelative } from 'react-intl';
import CommentForm from '../CommentForm';

class IssueComment extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      dialogOpen: false,
      commentEmpty: false,
    };
    this.toggleDeleteDialog = this.toggleDeleteDialog.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.cancelEditComment = this.cancelEditComment.bind(this);
  }

  toggleDeleteDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  handleEdit(values) {
    if (values.get('comment')) {
      this.setState({ commentEmpty: false });
      this.props.onEdit({ body: values.get('comment') });
      this.props.askForPermissionToEdit();
    } else {
      this.setState({ commentEmpty: true });
    }
  }

  cancelEditComment() {
    this.props.onClearEdit();
    this.setState({ commentEmpty: false });
    this.props.askForPermissionToEdit();
  }

  render() {
    const { comment, commentError } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.toggleDeleteDialog}
      />,
      <FlatButton
        label="Delete"
        primary
        keyboardFocused
        onTouchTap={() => {
          this.toggleDeleteDialog();
          this.props.onDelete();
        }}
      />,
    ];
    return (
      <Card style={{ marginTop: 15 }}>
        <CardHeader
          title={<span>
            <b>{comment._links.creator.name}</b>
            &nbsp;&nbsp;&nbsp;
            <i style={{ color: '#888', fontWeight: 300, fontSize: 14 }}>
              {comment._links.creator.nickname}
            </i>
          </span>}
          subtitle={
            <span>
              <FormattedRelative value={comment.created_at} />
              { comment.created_at !== comment.updated_at && <span>&nbsp;&nbsp;-&nbsp;&nbsp;<i>edited <FormattedRelative value={comment.updated_at} /></i></span>}
            </span>
          }
          avatar={comment._links.creator.image.href}
          actAsExpander={!this.props.isEditing && this.props.isAuthenticated}
          showExpandableButton={!this.props.isEditing && this.props.isAuthenticated}
        />
        { !this.props.isEditing ?
          <CardText style={{ paddingTop: 0, paddingBottom: 1 }}>
            <div dangerouslySetInnerHTML={{ __html: comment.body }} /> { // eslint-disable-line
            }
          </CardText>
          : <div style={{ marginLeft: 10, marginRight: 10, paddingBottom: 10 }}>
            <CommentForm
              key={`editComment${comment.id}`}
              form={`editComment${comment.id}`}
              editing
              initialBody={comment.body}
              onSubmit={this.handleEdit}
              onCancel={this.cancelEditComment}
              commentError={commentError}
              commentEmpty={this.state.commentEmpty}
            />
          </div>
        }
        { this.props.isAuthenticated &&
          <CardActions
            expandable
            style={!this.props.isEditing ?
              { marginTop: -5 } : { marginTop: -5, display: 'none' }
            }
          >
            <FlatButton
              primary
              label="Edit"
              labelStyle={{ fontWeight: 700 }}
              onTouchTap={() => this.props.askForPermissionToEdit()}
              disabled={!this.props.canEdit}
            />
            <FlatButton
              primary
              label="Delete"
              labelStyle={{ fontWeight: 700 }}
              onTouchTap={this.toggleDeleteDialog}
            />
          </CardActions>
        }
        <Dialog
          title="Delete comment"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.toggleDeleteDialog}
        >
          Are you sure you want to delete this comment?
        </Dialog>
      </Card>
    );
  }
}

IssueComment.propTypes = {
  comment: PropTypes.object.isRequired,
  commentError: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClearEdit: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  askForPermissionToEdit: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  canEdit: PropTypes.bool,
};

export default IssueComment;
