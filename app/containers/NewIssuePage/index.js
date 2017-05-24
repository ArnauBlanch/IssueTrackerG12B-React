/*
 *
 * NewIssuePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { makeSelectNewIssuePage, makeSelectAuthUser } from './selectors';
import IssueForm from '../../components/IssueForm';
import { getUsersRequest, createIssueRequest } from './actions';

export class NewIssuePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { attachments: [] };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendIssue = this.sendIssue.bind(this);
  }
  componentWillMount() {
    this.props.dispatch(getUsersRequest());
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
    if ((values.get('attachments') && this.state.attachments.length === values.get('attachments').files.length)
      || typeof values.get('attachments') === 'undefined') {
      const newIssue = {
        title: values.get('title'),
        kind: values.get('kind'),
        priority: values.get('priority'),
      };
      if (values.get('description')) {
        newIssue.description = values.get('description');
      }
      if (values.get('assignee')) {
        newIssue.assignee_id = values.get('assignee');
      }
      if (this.state.attachments.length > 0) {
        newIssue.attached_files = this.state.attachments;
      }
      this.props.dispatch(createIssueRequest(newIssue));
    }
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <Helmet title="Issue Tracker | Create new issue" />
        <h3 style={{ textAlign: 'center' }}>Create issue</h3>
        <IssueForm
          dispatch={this.props.dispatch}
          authUser={parseInt(this.props.authUser)}
          onSubmit={this.handleSubmit}
          users={this.props.NewIssuePage.users}
        />
      </div>
    );
  }
}

NewIssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  NewIssuePage: makeSelectNewIssuePage(),
  authUser: makeSelectAuthUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssuePage);
