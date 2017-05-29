/**
*
* IssueDetailsHeader
*
*/

import React, { PropTypes } from 'react';
import { RaisedButton, SelectField, MenuItem, Dialog, FlatButton } from 'material-ui';
import StatusLabel from '../StatusLabel';
import CommentForm from '../CommentForm';

const statusList = [
  'new_issue',
  'open',
  'on_hold',
  'resolved',
  'duplicate',
  'invalid_issue',
  'wontfix',
  'closed',
];

class IssueDetailsHeader extends React.Component {  // eslint-disable-line react/prefer-stateless-function
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false, statusToChange: undefined, dialogDeleteOpen: false };
    this.handleDialogStatusOpen = this.handleDialogStatusOpen.bind(this);
    this.handleDialogStatusClose = this.handleDialogStatusClose.bind(this);
    this.handleDialogDeleteOpen = this.handleDialogDeleteOpen.bind(this);
    this.handleDialogDeleteClose = this.handleDialogDeleteClose.bind(this);
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

  handleDialogDeleteOpen() {
    this.setState({ dialogDeleteOpen: true });
  }

  handleDialogDeleteClose() {
    this.setState({ dialogDeleteOpen: false });
  }

  render() {
    const { id, status, editError } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary
        onTouchTap={this.handleDialogDeleteClose}
      />,
      <FlatButton
        label="Delete"
        primary
        keyboardFocused
        onTouchTap={() => {
          this.handleDialogDeleteClose();
          this.props.onDelete();
        }}
      />,
    ];
    return (
      <div className="mdl-grid" style={{ width: '100%' }}>
        <div className="mdl-cell mdl-cell--5-col">
          <h4 style={{ marginTop: 0, marginBottom: -8 }}>Issue #{id}&nbsp;&nbsp;<StatusLabel status={status} /></h4>
        </div>
        { this.props.isAuthenticated &&
          <div className="mdl-cell mdl-cell--2-col mdl-cell--12-col-phone" style={{ textAlign: 'center', marginTop: -5, height: 60 }}>
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
              title={<div>Changing status to&nbsp;&nbsp;{this.state.statusToChange && <StatusLabel status={this.state.statusToChange} /> }</div>}
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
        }
        { this.props.isAuthenticated &&
          <div className="mdl-cell mdl-cell--5-col" style={{ textAlign: 'center', height: 'calc(100% - 40px)' }}>
            <RaisedButton
              label="Edit"
              primary
              labelStyle={{ fontWeight: 500 }}
              style={{ minWidth: 80, margin: 5 }}
              href={`/issues/${id}/edit`}
            />
            <RaisedButton
              label="Delete"
              labelStyle={{ fontWeight: 500, color: 'white' }}
              backgroundColor="#D50000"
              style={{ minWidth: 80, margin: 5 }}
              onTouchTap={this.handleDialogDeleteOpen}
            />
          </div>
        }

        <Dialog
          title="Delete issue"
          actions={actions}
          open={this.state.dialogDeleteOpen}
          onRequestClose={this.handleDialogDeleteClose}
          modal={false}
        >
          Are you sure you want to delete this issue?
        </Dialog>
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
  onDelete: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default IssueDetailsHeader;
