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
  render() {
    const { commentError, commentEmpty } = this.props;
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >

        <Field
          name="comment"
          component={Wysiwyg}
          style={{ width: '100%' }}
        />
        { commentError && <span style={{ color: 'red', marginBottom: 15 }}>{'There was an error when sending the comment'}</span> }
        { commentEmpty && <span style={{ color: 'red', marginBottom: 15 }}>{'The comment can\'t be blank'}</span> }
        <RaisedButton
          label="Comment"
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
  commentError: PropTypes.bool.isRequired,
  commentEmpty: PropTypes.bool,
};

export default reduxForm({
  form: 'commentForm',
})(CommentForm);
