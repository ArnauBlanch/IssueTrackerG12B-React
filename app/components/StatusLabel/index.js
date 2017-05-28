/**
*
* StatusLabel
*
*/

import React, { PropTypes } from 'react';


function StatusLabel(props) {
  let status;

  const style = {
    border: '1px solid #ccc',
    borderRadius: '3px',
    fontSize: '11px',
    padding: '2px 5px',
    textAlign: 'center',
    display: 'inline-block',
    fontWeight: '700',
    lineHeight: '99%',
  };

  switch (props.status) {
    case 'open':
      style.background = '#ccc';
      style.borderColor = '#ccc';
      style.color = '#333';
      status = 'OPEN';
      break;
    case 'on_hold':
      style.backgroundColor = '#f6c342';
      style.borderColor = '#f6c342';
      style.color = '#594300';
      status = 'ON HOLD';
      break;
    case 'invalid_issue':
      style.backgroundColor = '#d04437';
      style.borderColor = '#d04437';
      style.color = '#fff';
      status = 'INVALID';
      break;
    case 'resolved':
      style.backgroundColor = '#14892c';
      style.borderColor = '#14892c';
      style.color = '#fff';
      status = 'RESOLVED';
      break;
    case 'closed':
      style.backgroundColor = '#14892c';
      style.borderColor = '#14892c';
      style.color = '#fff';
      status = 'CLOSED';
      break;
    case 'duplicate':
      style.backgroundColor = '#815b3a';
      style.borderColor = '#815b3a';
      style.color = '#fff';
      status = 'DUPLICATE';
      break;
    case 'wontfix':
      style.backgroundColor = '#d04437';
      style.borderColor = '#d04437';
      style.color = '#fff';
      status = 'WONTFIX';
      break;
    default:
      style.backgroundColor = '#4a6785';
      style.borderColor = '#4a6785';
      style.color = '#fff';
      status = 'NEW';
  }

  return (
    <span style={style}>{status}</span>
  );
}

StatusLabel.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusLabel;
