/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { blue800 } from 'material-ui/styles/colors';

export default class NotFound extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div style={{ textAlign: 'center', marginTop: 100 }}>
        <div style={{ fontSize: 80, color: blue800 }}>Ooops!</div>
        <div style={{ marginTop: 60, fontSize: 18 }}>The page you were looking for does not exist...</div>
      </div>
    );
  }
}
