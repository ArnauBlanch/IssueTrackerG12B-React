/*
 *
 * EditIssuePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { Card } from 'material-ui';
import { goBack } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import makeSelectEditIssuePage from './selectors';
import { getUsersRequest } from './actions';
import IssueForm from '../../components/IssueForm';
import { makeSelectAuthUser } from '../NewIssuePage/selectors';

const issue = {
  id: 10,
  title: 'test title',
  description: 'test <b>description</b>',
  kind: 'bug',
  priority: 'major',
  _links: {
    creator: {
      name: 'Arnau Blanch Cortès',
      nickname: 'ArnauBlanch',
      image: {
        href: 'http://pbs.twimg.com/profile_images/841205642769629184/ba6_2x4__normal.jpg',
      },
    },
    assignee: {
      id: 2,
      name: 'Arnau Blanch Cortès',
      nickname: 'ArnauBlanch',
      image: {
        href: 'http://pbs.twimg.com/profile_images/841205642769629184/ba6_2x4__normal.jpg',
      },
    },
  },
  _embedded: {
    attached_files: [
      {
        name: 'Firefox_wallpaper.png',
        _links: {
          self: {
            href: '/attached_files/16',
          },
          url: 'https://s3-us-west-1.amazonaws.com/aswissuetrackerg12b/attached_files/files/000/000/016/original/Firefox_wallpaper.png?1495644360',
        },
      },
    ],
  },
};

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
    // this.props.dispatch(getIssueRequest());
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
    if ((values.attachments && this.state.attachments.length === values.attachments.files.length)
      || typeof values.attachments === 'undefined') {
      const oldValues = issue;
      const newValues = values.toJS();
      console.log(newValues);
      const editedValues = {};
      if (newValues.title !== oldValues.title) {
        editedValues.title = newValues.title;
      } if (newValues.description !== oldValues.description) {
        editedValues.description = newValues.description;
      } if (newValues.kind !== oldValues.kind) {
        editedValues.kind = newValues.kind;
      } if (newValues.priority !== oldValues.priority) {
        editedValues.priority = newValues.priority;
      } if (newValues.assignee !== oldValues.assignee) {
        editedValues.assignee = newValues.assignee === 'unassigned' ? null : newValues.assignee;
      } if (newValues.comment) {
        editedValues.comment = newValues.comment;
      } if (this.state.attachments.length > 0) {
        editedValues.attached_files = this.state.attachments;
      }
      // this.props.dispatch(editIssueRequest(id, newValues));
      console.log(editedValues);
    }
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--5-col">
        <Card style={{ paddingTop: 10 }}>
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
              assignee: issue._links.assignee.id,
              attachments: issue._embedded.attached_files,
            }}
            editing
          />
        </Card>
      </div>
    );
  }
}

EditIssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  EditIssuePage: PropTypes.object.isRequired,
  authUser: PropTypes.number.isRequired,
};

const mapStateToProps = createStructuredSelector({
  EditIssuePage: makeSelectEditIssuePage(),
  authUser: makeSelectAuthUser(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditIssuePage);
