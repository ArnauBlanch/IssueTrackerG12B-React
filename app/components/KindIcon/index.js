/**
*
* KindIcon
*
*/

import React from 'react';
import bug from '../../images/issue_kinds/bug.svg';
import proposal from '../../images/issue_kinds/suggestion.svg';
import enhancement from '../../images/issue_kinds/improvement.svg';
import task from '../../images/issue_kinds/task.svg';


function KindIcon(props) {
  let kindIcon;
  switch (props.kind) {
    case 'proposal':
      kindIcon = proposal;
      break;
    case 'enhancement':
      kindIcon = enhancement;
      break;
    case 'task':
      kindIcon = task;
      break;
    default:
      kindIcon = bug;
      break;
  }

  return (
    <img alt="kind" src={kindIcon} />
  );
}

KindIcon.propTypes = {
  kind: React.PropTypes.string.isRequired,
};

export default KindIcon;
