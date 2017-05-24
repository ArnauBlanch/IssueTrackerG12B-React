/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import AppHeader from '../../components/AppHeader';
import { makeSelectAuth } from './selectors';
import { setAuthToken, setUnauthenticated } from './actions';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleAuthChange = this.handleAuthChange.bind(this);
  }

  handleAuthChange(value) {
    if (value === 'unauthenticated') {
      this.props.dispatch(setUnauthenticated());
    } else {
      this.props.dispatch(setAuthToken(value));
    }
  }

  render() {
    return (
      <div>
        <AppHeader
          authUser={parseInt(this.props.authState.authUser)}
          isAuthenticated={this.props.authState.isAuthenticated}
          handleAuthChange={this.handleAuthChange}
        />
        <div
          className="mdl-grid"
          style={{
            justifyContent: 'center',
            // margin: 0,
            marginTop: 64,
            maxHeight: '100vh',
            minHeight: 'min-content',
          }}
        >
          {React.Children.toArray(this.props.children)}
        </div>
      </div>
    );
  }
}
App.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
  children: React.PropTypes.node,
  authState: React.PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authState: makeSelectAuth(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
