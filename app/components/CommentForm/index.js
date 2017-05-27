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
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >

        <Field
          name="comment"
          component={Wysiwyg}
          style={{ width: '100%' }}
        />
        <RaisedButton
          label="Comment"
          type="submit"
          primary
          style={{ marginTop: 15 }}
        />
        <FlatButton
          label="Cancel"
          primary
          style={{ marginTop: 15, marginLeft: 15, marginBottom: 30 }}
          onTouchTap={this.props.onCancel}
        />
      </form>
    );
  }
}

CommentForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default reduxForm({
  form: 'commentForm',
})(CommentForm);
