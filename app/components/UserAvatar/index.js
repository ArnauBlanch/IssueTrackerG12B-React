/**
*
* UserAvatar
*
*/

import React, { PropTypes } from 'react';
import { Chip, Avatar } from 'material-ui';
import { blue50 } from 'material-ui/styles/colors';

function UserAvatar(props) {
  const style = { width: 'min-content', maxWidth: '100%' };
  if (props.centered) {
    style.margin = 'auto';
  }
  return (
    <div style={style}>
      <Chip
        style={{ margin: 'auto', maxWidth: '100%', overflow: 'hidden' }}
        backgroundColor={blue50}
        labelStyle={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        { props.imageUrl && <Avatar src={props.imageUrl} /> }
        {props.name}
      </Chip>
    </div>
  );
}

UserAvatar.propTypes = {
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  centered: PropTypes.bool,
};

export default UserAvatar;
