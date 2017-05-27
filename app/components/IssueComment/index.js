/**
*
* Comment
*
*/

import React, { PropTypes } from 'react';
import { Card, CardHeader, CardActions, FlatButton, CardText, Dialog } from 'material-ui';
import { FormattedRelative } from 'react-intl';

class IssueComment extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  render() {
    const { comment } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.toggleDialog}
      />,
      <FlatButton
        label="Delete"
        primary
        keyboardFocused
        onTouchTap={() => {
          this.toggleDialog();
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
          subtitle={<FormattedRelative value={comment.created_at} />}
          avatar={comment._links.creator.image.href}
          actAsExpander={this.props.isAuthenticated}
          showExpandableButton={this.props.isAuthenticated}
        />
        <CardText>
          <div dangerouslySetInnerHTML={{ __html: comment.body }} /> { // eslint-disable-line
          }
        </CardText>
        { this.props.isAuthenticated &&
          <CardActions expandable style={{ marginTop: -20 }}>
            <FlatButton
              primary
              label="Edit"
              labelStyle={{ fontWeight: 700 }}
            />
            <FlatButton
              primary
              label="Delete"
              labelStyle={{ fontWeight: 700 }}
              onTouchTap={this.toggleDialog}
            />
          </CardActions>
        }
        <Dialog
          title="Delete comment"
          actions={actions}
          modal={false}
          open={this.state.dialogOpen}
          onRequestClose={this.toggleDialog}
        >
          Are you sure you want to delete this comment?
        </Dialog>
      </Card>
    );
  }
}

IssueComment.propTypes = {
  comment: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default IssueComment;
