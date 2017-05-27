/*
 *
 * EditIssuePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card, CircularProgress } from 'material-ui';
import { goBack } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectEditIssuePage from './selectors';
import { getUsersRequest, editIssueRequest } from './actions';
import IssueForm from '../../components/IssueForm';
import { makeSelectAuthUser } from '../NewIssuePage/selectors';
import { getIssueRequest } from '../IssueDetailsPage/actions';
import makeSelectIssueDetailsPage from '../IssueDetailsPage/selectors';

export class EditIssuePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = {
      attachments: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendIssue = this.sendIssue.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getUsersRequest());
    this.props.dispatch(getIssueRequest(this.props.params.issueID));
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.authUser === 'undefined') {
      this.props.dispatch(goBack());
    }
  }

  handleSubmit(values) {
    if (values.get('attachments')) {
      values.get('attachments').files.forEach((a) => {
        const reader = new FileReader();
        reader.readAsDataURL(a);
        reader.onload = () => {
          const { attachments } = this.state;
          attachments.push({
            name: a.name,
            content: reader.result,
          });
          this.setState({ attachments });
          this.sendIssue(values);
        };
        // reader.onError = () => this.setState({ imageError: true });
      });
    } else {
      this.sendIssue(values);
    }
  }

  sendIssue(values) {
    const { issue } = this.props.IssueDetailsPage;
    if ((values.attachments && this.state.attachments.length === values.attachments.files.length)
      || typeof values.attachments === 'undefined') {
      const oldValues = issue;
      const newValues = values.toJS();
      const editedValues = {};
      if (newValues.title !== oldValues.title) {
        editedValues.title = newValues.title;
      }
      if (newValues.description !== oldValues.description) {
        editedValues.description = newValues.description;
      }
      if (newValues.kind !== oldValues.kind) {
        editedValues.kind = newValues.kind;
      }
      if (newValues.priority !== oldValues.priority) {
        editedValues.priority = newValues.priority;
      }
      if ((newValues.assignee_id !== oldValues.assignee_id)
      && !(typeof oldValues.assignee_id === 'undefined' && newValues.assignee_id === 'unassigned')) {
        editedValues.assignee_id = newValues.assignee_id === 'unassigned' ? null : newValues.assignee_id;
      }
      if (newValues.comment) {
        editedValues.comment = newValues.comment;
      }
      if (this.state.attachments.length > 0) {
        editedValues.attached_files = this.state.attachments;
      }
      this.props.dispatch(editIssueRequest(this.props.params.issueID, editedValues));
    }
  }

  render() {
    const { issue } = this.props.IssueDetailsPage;
    const fetchingIssue = this.props.IssueDetailsPage.currentlySending;
    const { issueID } = this.props.params;
    return (
      <div style={{ maxWidth: 550, width: '100%', margin: 5 }}>
        { fetchingIssue || !issue || issue.id !== parseInt(issueID, 10) ?
          <CircularProgress size={60} thickness={6} />
          : <Card style={{ paddingTop: 10 }}>
            <Helmet title="Issue Tracker | Edit [...]" />
            <h3 style={{ textAlign: 'center' }}>Edit issue</h3>
            <IssueForm
              dispatch={this.props.dispatch}
              authUser={parseInt(this.props.authUser, 10)}
              onSubmit={this.handleSubmit}
              users={this.props.EditIssuePage.users}
              initialValues={{
                title: issue.title,
                description: issue.description,
                kind: issue.kind,
                priority: issue.priority,
                creator: issue._links.creator,
                assignee_id: issue._links.assignee ? issue._links.assignee.id : 'unassigned',
                attachments: issue._embedded.attached_files,
              }}
              editing
            />
          </Card>
        }
      </div>
    );
  }
}

EditIssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  EditIssuePage: PropTypes.object.isRequired,
  authUser: PropTypes.number.isRequired,
  IssueDetailsPage: PropTypes.object.isRequired,
  params: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditIssuePage: makeSelectEditIssuePage(),
  IssueDetailsPage: makeSelectIssueDetailsPage(),
  authUser: makeSelectAuthUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditIssuePage);
