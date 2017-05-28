/**
*
* UserAvatar
*
*/

import React, { PropTypes } from 'react';
import { Chip, Avatar } from 'material-ui';
import { blue50 } from 'material-ui/styles/colors';

function UserAvatar(props) {
  return (
    <div style={{ width: 'min-content', maxWidth: '100%', margin: 'auto' }}>
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
};

export default UserAvatar;
