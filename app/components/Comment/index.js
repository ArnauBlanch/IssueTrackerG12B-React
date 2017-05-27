/**
*
* Comment
*
*/

import React from 'react';
import { Card, CardHeader, CardActions, FlatButton, CardText } from 'material-ui';

class Comment extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <Card>
        <CardHeader
          title={<span><b>Arnau Blanch Cortès</b>&nbsp;&nbsp;&nbsp;<i style={{ color: '#888', fontWeight: 300, fontSize: 14 }}>ArnauBlanch</i></span>}
          subtitle="13 minutes ago"
          avatar="http://fillmurray.com/100/100"
          actAsExpander
          showExpandableButton
        />
        <CardText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
          Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
          Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </CardText>
        <CardActions expandable style={{ marginTop: -20 }}>
          <FlatButton
            primary
            label="Edit"
            labelStyle={{ fontWeight: 700 }}
          />
          <FlatButton
            primary
            label="Delete"
            labelStyle={{ fontWeight: 700 }}
          />
        </CardActions>
      </Card>
    );
  }
}

Comment.propTypes = {

};

export default Comment;
