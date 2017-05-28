/**
*
* IssueDetailsHeader
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton, SelectField, MenuItem, Dialog } from 'material-ui';
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
    this.state = { dialogOpen: false, statusToChange: undefined };
    this.handleDialogStatusOpen = this.handleDialogStatusOpen.bind(this);
    this.handleDialogStatusClose = this.handleDialogStatusClose.bind(this);
  }

  handleDialogStatusOpen(status) {
    if (status !== statusList.indexOf(this.props.status)) {
      this.setState({ dialogOpen: true, statusToChange: statusList[status] });
    }
  }

  handleDialogStatusClose() {
    this.setState({ dialogOpen: false, statusToChange: undefined });
    this.props.clearError();
  }

  render() {
    const { id, status, editError } = this.props;
    return (
      <div className="mdl-grid" style={{ width: '100%' }}>
        <div className="mdl-cell mdl-cell--7-col">
          <h4 style={{ display: 'flex', alignItems: 'center' }}>Issue #{id}&nbsp;&nbsp;<StatusLabel status={status} /></h4>
        </div>
        <div className="mdl-cell mdl-cell--2-col" style={{ display: 'flex', alignItems: 'center' }}>
          <SelectField
            value={statusList.indexOf(status)}
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
            title={<div>Changing status to&nbsp;&nbsp;<StatusLabel status={this.state.statusToChange} /></div>}
            open={this.state.dialogOpen}
            modal={false}
            onRequestClose={this.handleDialogStatusClose}
          >
            <CommentForm
              form="statusForm"
              editing
              onSubmit={(values) => {
                this.props.handleStatusChange(this.state.statusToChange, values.get('comment'));
                this.handleDialogStatusClose();
              }}
              onCancel={this.handleDialogStatusClose}
              statusError={editError}
            ></CommentForm>
          </Dialog>
        </div>
        <div className="mdl-cell mdl-cell--1-col mdl-cell--4-col--phone" style={{ display: 'flex', alignItems: 'center' }}>
          <RaisedButton
            label="Attach"
            labelStyle={{ fontWeight: 500 }}
            style={{ minWidth: 85 }}
          />
        </div>

        <div className="mdl-cell mdl-cell--1-col mdl-cell--4-col--phone" style={{ display: 'flex', alignItems: 'center' }}>
          <RaisedButton
            label="Edit"
            primary
            labelStyle={{ fontWeight: 500 }}
            style={{ minWidth: 85 }}
            href={`/issues/${id}/edit`}
          />
        </div>
        <div className="mdl-cell mdl-cell--1-col mdl-cell--4-col--phone" style={{ display: 'flex', alignItems: 'center' }}>
          <RaisedButton
            label="Delete"
            labelStyle={{ fontWeight: 500, color: 'white' }}
            backgroundColor="#D50000"
            style={{ minWidth: 85 }}
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
  editError: PropTypes.bool.isRequired,
  clearError: PropTypes.func.isRequired,
  handleStatusChange: PropTypes.func.isRequired,
};

export default IssueDetailsHeader;
