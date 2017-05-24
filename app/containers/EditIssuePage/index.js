/*
 *
 * EditIssuePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
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
  }
  componentWillMount() {
    this.props.dispatch(getUsersRequest());
    // this.props.dispatch(getIssueRequest());
  }

  render() {
    return (
      <div className="mdl-cell mdl-cell--4-col">
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
