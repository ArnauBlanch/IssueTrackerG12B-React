/**
*
* PriorityIcon
*
*/

import React, { PropTypes } from 'react';
import trivial from '../../images/issue_priorities/trivial.svg';
import minor from '../../images/issue_priorities/minor.svg';
import major from '../../images/issue_priorities/major.svg';
import critical from '../../images/issue_priorities/critical.svg';
import blocker from '../../images/issue_priorities/blocker.svg';


function PriorityIcon(props) {
  let priorityIcon;
  switch (props.priority) {
    case 'trivial':
      priorityIcon = trivial;
      break;
    case 'minor':
      priorityIcon = minor;
      break;
    case 'critical':
      priorityIcon = critical;
      break;
    case 'blocker':
      priorityIcon = blocker;
      break;
    default:
      priorityIcon = major;
      break;
  }

  return (
    <img alt="priority" src={priorityIcon} height="16px" />
  );
}

PriorityIcon.propTypes = {
  priority: PropTypes.string.isRequired,
};

export default PriorityIcon;
