/**
*
* BadgeNumber
*
*/

import React, { PropTypes } from 'react';
import { blue50, blue900 } from 'material-ui/styles/colors';


function BadgeNumber(props) {
  const style = {
    borderRadius: '2em',
    fontSize: '11px',
    fontWeight: 700,
    lineHeight: '.99',
    minHeight: '1.5em',
    minWidth: '2.1em',
    padding: '3px 5px 2px',
    display: 'inline-block',
    textAlign: 'center',
  };

  switch (props.focused) {
    case true:
      style.backgroundColor = blue900;
      style.color = '#fff';
      break;
    default:
      style.background = blue50;
      style.color = blue900;
  }

  return (
    <span style={style}>{props.number}</span>
  );
}

BadgeNumber.propTypes = {
  number: PropTypes.number.isRequired,
  focused: PropTypes.bool,
};

export default BadgeNumber;
