/**
*
* BadgeNumber
*
*/

import React from 'react';


function BadgeNumber(props) {
  const style = {
    borderRadius: '2em',
    fontSize: '11px',
    fontWeight: '700',
    lineHeight: '.99',
    minHeight: '1.5em',
    minWidth: '2.1em',
    padding: '3px 5px 2px',
    display: 'inline-block',
    textAlign: 'center',
  };

  switch (props.voted) {
    case true:
      style.backgroundColor = '#326ca6';
      style.color = '#fff';
      break;
    default:
      style.background = 'rgba(0,0,0,.2)';
      style.color = 'rgba(51,51,51,.8)';
  }

  return (
    <span style={style}>{props.number}</span>
  );
}

BadgeNumber.propTypes = {
  number: React.PropTypes.number.isRequired,
  voted: React.PropTypes.boolean,
};

export default BadgeNumber;
