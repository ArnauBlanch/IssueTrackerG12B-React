/**
*
* IssueForm
*
*/

import React, { PropTypes } from 'react';
import { reduxForm, Field } from 'redux-form/immutable';
import { TextField, SelectField } from 'redux-form-material-ui';
import { MenuItem } from 'material-ui';
import bugIcon from '../../images/issue_kinds/bug.svg';
import taskIcon from '../../images/issue_kinds/task.svg';
import enhancementIcon from '../../images/issue_kinds/improvement.svg';
import proposalIcon from '../../images/issue_kinds/suggestion.svg';

const textIcon = (text, src) => (
  <span><img alt="kind" src={src} />&nbsp;&nbsp;&nbsp;{text}</span>
);

class IssueForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  required(value) {
    return value ? undefined : 'Required field';
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >
        <Field
          name="name"
          component={TextField}
          floatingLabelText="Title"
          validate={this.required}
          style={{ maxWidth: 400, width: '100vh' }}
        /><br />
        <Field
          name="description"
          component={TextField}
          floatingLabelText="Description"
          style={{ maxWidth: 400, width: '100vh' }}
          multiLine
          rows={3}
        /><br />
        <Field name="kind" component={SelectField} floatingLabelText="Kind" >
          <MenuItem value="bug" primaryText={textIcon('Bug', bugIcon)} />
          <MenuItem value="task" primaryText={textIcon('Task', taskIcon)} />
          <MenuItem value="enhancement" primaryText={textIcon('Enhancement', enhancementIcon)} />
          <MenuItem value="proposal" primaryText={textIcon('Proposal', proposalIcon)} />
        </Field>
      </form>
    );
  }
}

IssueForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default reduxForm({ form: 'issueForm' })(IssueForm);
