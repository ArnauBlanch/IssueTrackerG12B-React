/**
*
* IssueForm
*
*/

import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { RaisedButton, FlatButton } from 'material-ui';
import Wysiwyg from '../Wysiwyg';


class CommentForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    if (this.props.initialBody) {
      this.props.initialize({ comment: this.props.initialBody });
    }
  }

  render() {
    const { commentError, commentEmpty, statusError } = this.props;
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >
        { typeof commentError === 'undefined' &&
          <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)' }}>
            Comment
          </div>
        }
        <Field
          name="comment"
          component={Wysiwyg}
          style={{ width: '100%' }}
        />
        { commentError && <span style={{ color: 'red' }}>{'There was an error when sending the comment'}<br /></span> }
        { commentEmpty && <span style={{ color: 'red' }}>{'The comment can\'t be blank'}<br /></span> }
        { statusError && <span style={{ color: 'red' }}>{'There was an error when changing the status'}<br /></span> }
        <RaisedButton
          label={this.props.editing ? 'Edit' : 'Comment'}
          type="submit"
          primary
          style={{ marginTop: 15 }}
        />
        <FlatButton
          label="Cancel"
          primary
          style={{ marginTop: 15, marginLeft: 15 }}
          onTouchTap={this.props.onCancel}
        />
      </form>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  commentError: PropTypes.bool,
  statusError: PropTypes.bool,
  commentEmpty: PropTypes.bool,
  initialize: PropTypes.func.isRequired,
  initialBody: PropTypes.string,
  editing: PropTypes.bool,
  commentID: PropTypes.number, // eslint-disable-line
};

export default reduxForm({})(CommentForm);
