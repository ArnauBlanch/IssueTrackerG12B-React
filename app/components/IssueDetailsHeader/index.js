/**
*
* IssueDetailsHeader
*
*/

import React, { PropTypes } from 'react';
import { FlatButton, SelectField, MenuItem, Dialog } from 'material-ui';
import StatusLabel from '../StatusLabel';
import CommentForm from '../CommentForm';

const statusList = [
  'new_issue',
  'open',
  'on_hold',
  'resolved',
  'duplicate',
  'invalid',
  'wontfix',
  'closed',
];

class IssueDetailsHeader extends React.Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
    this.handleDialogStatusOpen = this.handleDialogStatusOpen.bind(this);
    this.handleDialogStatusClose = this.handleDialogStatusClose.bind(this);
  }

  handleDialogStatusOpen(status) {
    if (status !== statusList.indexOf(this.props.status)) {
      this.setState({ dialogOpen: true });
    }
  }

  handleDialogStatusClose() {
    this.setState({ dialogOpen: false });
  }

  render() {
    const id = this.props.id;
    const status = this.props.status;

    return (
      <div>
        <b style={{ marginRight: '10px', fontSize: '15px' }}>Issue #{id}</b>
        <StatusLabel status={status} />
        <div style={{ float: 'right' }}>

          <SelectField
            value={statusList.indexOf(status)}
            // labelStyle={{ fontWeight: '500' }}
            style={{ marginLeft: '10px', width: 120 }}
            floatingLabelText="Workflow"
            menuItemStyle={{ textAlign: 'center' }}
            labelStyle={{ textAlign: 'center', width: 140 }}
            onChange={(e, value) => this.handleDialogStatusOpen(value)}
          >
            { statusList.map((s, index) => (
              <MenuItem key={index} value={index} primaryText={<StatusLabel status={s} />} />
            ))}
          </SelectField>

          <Dialog
            title="Title"
            open={this.state.dialogOpen}
            onRequestClose={() => this.handleDialogStatusClose()}
          >
            <CommentForm
              editing
              handleSubmit={() => this.handleStatusChange()}
            ></CommentForm>
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
  // handleStatusChange: PropTypes.function.isRequired,
};

export default IssueDetailsHeader;
