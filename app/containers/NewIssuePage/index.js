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

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export class NewIssuePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    console.log(this.props);
    return (
      <div className="mdl-cell mdl-cell--4-col">
        <Helmet title="Issue Tracker | Create new issue" />
        <h3 style={{ textAlign: 'center' }}>Create issue</h3>
        <IssueForm dispatch={this.props.dispatch} authUser={parseInt(this.props.authUser)}  />
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
