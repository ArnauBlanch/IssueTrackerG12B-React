/**
*
* UserAvatar
*
*/

import React from 'react';
import { Chip, Avatar } from 'material-ui';

const styles = {
  chip: {
    margin: 4,
  },
};

function UserAvatar(props) {
  return (
    <Chip style={styles.chip}>
      { props.imageUrl && <Avatar src={props.imageUrl} /> }
      {props.name}
    </Chip>
  );
}

UserAvatar.propTypes = {
  name: React.PropTypes.string.isRequired,
  imageUrl: React.PropTypes.string,
};

export default UserAvatar;
