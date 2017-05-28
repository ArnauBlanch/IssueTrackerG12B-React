/**
*
* IssueDetailsHeader
*
*/

import React, { PropTypes } from 'react';
import { FlatButton, DropDownMenu, MenuItem, Dialog } from 'material-ui';
import StatusLabel from '../../components/StatusLabel';

class IssueDetailsHeader extends React.Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
    this.handleDialogOpen = this.handleDialogOpen.bind(this);
    this.handleDialogClose = this.handleDialogClose.bind(this);
  }

  handleDialogOpen = () => {
    this.setState({ dialogOpen: true });
  };

  handleDialogClose = () => {
    this.setState({ dialogOpen: false });
  };

  render() {
    const id = this.props.id;
    const status = this.props.status;

    return (
      <div>
        <b style={{ marginRight: '10px', fontSize: '15px' }}>Issue #{id}</b>
        <StatusLabel status={status} />
        <div style={{ float: 'right' }}>

          <DropDownMenu
            value={0}
            labelStyle={{ fontWeight: '500' }}
            style={{ marginLeft: '10px' }}
            /* href={`/issues/${id}/edit`} */
          >
            <MenuItem value={0} primaryText="Workflow" hidden="true" />
            {status !== 'new_issue' && <MenuItem value="new_issue" primaryText="new" onClick={this.handleDialogOpen} />}
            {status !== 'open' && <MenuItem value="open" primaryText="open" onClick={this.handleDialogOpen} />}
            {status !== 'on_hold' && <MenuItem value="on_hold" primaryText="on hold" onClick={this.handleDialogOpen} />}
            {status !== 'resolved' && <MenuItem value="resolved" primaryText="resolved" onClick={this.handleDialogOpen} />}
            {status !== 'duplicate' && <MenuItem value="duplicate" primaryText="duplicate" onClick={this.handleDialogOpen} />}
            {status !== 'invalid_issue' && <MenuItem value="invalid_issue" primaryText="invalid" onClick={this.handleDialogOpen} />}
            {status !== 'wontfix' && <MenuItem value="wontfix" primaryText="wontfix" onClick={this.handleDialogOpen} />}
            {status !== 'closed' && <MenuItem value="closed" primaryText="closed" onClick={this.handleDialogOpen} />}
          </DropDownMenu>

          <Dialog
            title="Title"
            open={this.state.dialogOpen}
            onRequestClose={this.state.handleDialogClose}
            modal={false}
          >
          </Dialog>

          <FlatButton
            label="Attach"
            labelStyle={{ fontWeight: '500' }}
            style={{ marginLeft: '10px' }}
          />

          <FlatButton
            label="Edit"
            labelStyle={{ fontWeight: '500' }}
            style={{ marginLeft: '10px' }}
            href={`/issues/${id}/edit`}
          />
        </div>
      </div>
    );
  }
}

IssueDetailsHeader.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};

export default IssueDetailsHeader;
