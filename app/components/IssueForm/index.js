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
import { goBack } from 'react-router-redux';
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

  componentWillMount() {
    console.log(this.props.initialValues.toJS());
    const values = this.props.initialValues;
    this.props.initialize({
      title: values.get('title'),
      description: values.get('description'),
      kind: values.get('kind'),
      priority: values.get('priority'),
      assignee_id: values.get('assignee_id'),
    });
  }

  filesChanged(e) {
    this.setState({ files: e.files });
  }

  required(value) {
    return value ? undefined : 'Required field';
  }

  render() {
    let creator = this.props.initialValues.get('creator');
    if (typeof creator !== 'undefined') {
      creator = creator.toJS();
    }
    return (
      <form
        onSubmit={this.props.handleSubmit}
        style={{ marginLeft: 30, marginRight: 30 }}
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
        {
          this.props.editing && creator &&
            <div style={{ fontSize: 16 }}>
              <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.3)', paddingTop: 10, marginBottom: 5 }}>
                Creator
              </div>
              <span>
                { creator.image &&
                  <img
                    alt={creator.name}
                    src={creator.image.href}
                    height="16px"
                  />
                }
                &nbsp;&nbsp;&nbsp;<b>{creator.name}</b>&nbsp;&nbsp;
                <i style={{ color: '#888', fontWeight: 300, fontSize: 15 }}>{creator.nickname}</i>
              </span>
            </div>
        }
        <Field
          name="assignee_id"
          component={SelectField}
          floatingLabelText="Assignee"
          style={{ width: '100%' }}
          selectedMenuItemStyle={{ color: blue900 }}
        >
          <MenuItem value="unassigned" />
          { this.props.users.map((u) => <MenuItem key={u.id} value={u.id} primaryText={prepareUser(u)} />) }
        </Field><br />
        <div style={{ textAlign: 'center' }}>
          <FlatButton
            label="Assign to me"
            labelStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            style={{ marginTop: -5 }}
            onTouchTap={() => this.props.dispatch(change('issueForm', 'assignee_id', this.props.authUser + 1))}
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
          currentFiles={this.props.editing && this.props.initialValues.get('attachments').toJS()}
        />
        {
          this.props.editing &&
            <div>
              <div style={{ fontSize: '12px', color: 'rgba(0, 0, 0, 0.3)', paddingTop: 10 }}>
                Comment
              </div>
              <Field
                name="comment"
                component={Wysiwyg}
                floatingLabelText="Comment"
                style={{ width: '100%' }}
              />
            </div>
        }
        <br /><br />
        <div style={{ textAlign: 'center' }}>
          <RaisedButton
            label={this.props.editing ? 'Update issue' : 'Create issue'}
            type="submit"
            primary
          />
          <FlatButton
            label="Cancel"
            primary
            style={{ marginLeft: 40, marginBottom: 30 }}
            onTouchTap={() => this.props.dispatch(goBack())}
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
  initialize: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  editing: PropTypes.bool,
};

export default reduxForm({
  form: 'issueForm',
})(IssueForm);
