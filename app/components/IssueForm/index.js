/**
*
* IssueForm
*
*/

import React, { PropTypes } from 'react';
import { reduxForm, Field, change } from 'redux-form/immutable';
import { TextField, SelectField } from 'redux-form-material-ui';
import { MenuItem, RaisedButton, FlatButton } from 'material-ui';
import Wysiwyg from './Wysiwyg';
import DropzoneInput from './DropzoneInput';
import { kinds, priorities, users } from './kinds-priorities';

const prepareUser = (u) => (
  <span>
    <img alt={u.name} src={u._links.image.href} height="16px" />
    &nbsp;&nbsp;&nbsp;
    <b>{u.name}</b>
    &nbsp;&nbsp;
    <i style={{ color: '#888', fontWeight: 300, fontSize: 15 }}>{u.nickname}</i>
  </span>
);

class IssueForm extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { files: [], fileChanged: false };
    this.filesChanged = this.filesChanged.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  filesChanged(e) {
    this.setState({ files: e.files });
  }

  deleteFile(f) {
    const files = this.state.files;
    debugger;
    files.splice(files.indexOf(f), 1);
    debugger;
    this.setState({ files });
    debugger;
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
        >
          { users.map((u) => <MenuItem key={u.id} value={u.id} primaryText={prepareUser(u)} />) }
        </Field><br />
        <div style={{ textAlign: 'center' }}>
          <FlatButton
            label="Assign to me"
            labelStyle={{ fontWeight: 'bold' }}
            onTouchTap={() => this.props.dispatch(change('issueForm', 'assignee', this.props.authUser))}
          />
        </div>
        <Field
          name="kind"
          component={SelectField}
          floatingLabelText="Kind"
          style={{ width: '100%' }}
        >
          { kinds.map((k) => <MenuItem key={k.name} value={k.name} primaryText={k.icon} />) }
        </Field><br />
        <Field
          name="priority"
          component={SelectField}
          floatingLabelText="Priority"
          style={{ width: '100%' }}
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
        <div style={{ textAlign: 'center' }}><RaisedButton label="Create issue" primary /></div>
      </form>
    );
  }
}

IssueForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  authUser: PropTypes.number.isRequired,
};

export default reduxForm({
  form: 'issueForm',
  initialValues: {
    kind: 'bug',
    priority: 'major',
  },
})(IssueForm);
