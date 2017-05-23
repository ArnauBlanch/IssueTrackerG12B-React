/*
 *
 * NewIssuePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectNewIssuePage from './selectors';
import IssueForm from '../../components/IssueForm';

export class NewIssuePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet title="Issue Tracker | Create new issue" />
        <IssueForm />
      </div>
    );
  }
}

NewIssuePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  NewIssuePage: makeSelectNewIssuePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewIssuePage);
