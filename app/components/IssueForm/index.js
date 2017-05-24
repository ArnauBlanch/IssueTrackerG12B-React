/**
*
* IssueForm
*
*/

import React, { PropTypes } from 'react';
import { reduxForm, Field, change } from 'redux-form/immutable';
import { TextField, SelectField } from 'redux-form-material-ui';
import { MenuItem, RaisedButton, FlatButton } from 'material-ui';
import { blue900 } from 'material-ui/styles/colors';
import Wysiwyg from './Wysiwyg';
import DropzoneInput from './DropzoneInput';
import { kinds, priorities } from './kinds-priorities';

const prepareUser = (u) => (
  <span>
    { u._links && u._links.image ?
      <img alt={u.name} src={u._links.image.href} height="16px" /> :
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    }
    &nbsp;&nbsp;&nbsp;
    <b>{u.name}</b>
    &nbsp;&nbsp;
    <i style={{ color: '#888', fontWeight: 300, fontSize: 15 }}>{u.nickname}</i>
  </span>
);

class IssueForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { files: [] };
    this.filesChanged = this.filesChanged.bind(this);
  }

  filesChanged(e) {
    this.setState({ files: e.files });
  }

  required(value) {
    return value ? undefined : 'Required field';
  }

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit}
      >
        <Field
          name="title"
          component={TextField}
          floatingLabelText="Title"
          validate={this.required}
          style={{ width: '100%' }}
        /><br />
        <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)', paddingTop: 10 }}>
          Description
        </div>
        <Field
          name="description"
          component={Wysiwyg}
          floatingLabelText="Description"
          style={{ width: '100%' }}
        />
        <Field
          name="assignee"
          component={SelectField}
          floatingLabelText="Assignee"
          style={{ width: '100%' }}
          selectedMenuItemStyle={{ color: blue900 }}
        >
          <MenuItem value="" />
          { this.props.users.map((u) => <MenuItem key={u.id} value={u.id} primaryText={prepareUser(u)} />) }
        </Field><br />
        <div style={{ textAlign: 'center' }}>
          <FlatButton
            label="Assign to me"
            labelStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            style={{ marginTop: -5 }}
            onTouchTap={() => this.props.dispatch(change('issueForm', 'assignee', this.props.authUser + 1))}
          />
        </div>
        <Field
          name="kind"
          component={SelectField}
          floatingLabelText="Kind"
          style={{ width: '100%' }}
          selectedMenuItemStyle={{ color: blue900 }}
        >
          { kinds.map((k) => <MenuItem key={k.name} value={k.name} primaryText={k.icon} />) }
        </Field><br />
        <Field
          name="priority"
          component={SelectField}
          floatingLabelText="Priority"
          style={{ width: '100%' }}
          selectedMenuItemStyle={{ color: blue900 }}
        >
          { priorities.map((p) => <MenuItem key={p.name} value={p.name} primaryText={p.icon} />) }
        </Field><br />
        <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)', paddingTop: 10, textAlign: 'center' }}>
          Attachments
        </div>
        <Field
          name="attachments"
          component={DropzoneInput}
          onChange={this.filesChanged}
          onFocus={this.fileChanged}
        /><br />
        <br />
        <div style={{ textAlign: 'center' }}>
          <RaisedButton
            label="Create issue"
            type="submit"
            primary
          />
        </div>
      </form>
    );
  }
}

IssueForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authUser: PropTypes.number.isRequired,
  users: PropTypes.array.isRequired,
};

export default reduxForm({
  form: 'issueForm',
  initialValues: {
    kind: 'bug',
    priority: 'major',
  },
})(IssueForm);
