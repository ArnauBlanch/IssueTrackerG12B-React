/**
*
* UserAvatar
*
*/

import React from 'react';
import { Chip, Avatar } from 'material-ui';

function UserAvatar(props) {
  return (
    <div style={{ width: 'min-content', maxWidth: '100%', margin: 'auto' }}>
      <Chip
        style={{ margin: 'auto', maxWidth: '100%', overflow: 'hidden', width: 'available' }}
        labelStyle={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
      >
        { props.imageUrl && <Avatar src={props.imageUrl} /> }
        {props.name}
      </Chip>
    </div>
  );
}

UserAvatar.propTypes = {
  name: React.PropTypes.string.isRequired,
  imageUrl: React.PropTypes.string,
};

export default UserAvatar;
