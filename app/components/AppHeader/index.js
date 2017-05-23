import React from 'react';
import { AppBar, Chip, Dialog, RadioButtonGroup, RadioButton } from 'material-ui';
import { blue200 } from 'material-ui/styles/colors';
import ApiUsers from '../../utils/ApiUsers';

class AppHeader extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.state = { dialogOpen: false };
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  render() {
    return (
      <div>
        <AppBar
          title="Issue Tracker"
          showMenuIconButton={false}
          iconElementRight={
            <Chip
              style={{ top: 8, marginRight: 10, backgroundColor: blue200 }}
              onTouchTap={this.toggleDialog}
            >
              <b>{ this.props.isAuthenticated ? ApiUsers[this.props.authUser].username : 'Unauthenticated' }</b>
            </Chip>
          }
        />
        <div>
          <Dialog
            title="Choose a user"
            open={this.state.dialogOpen}
            onRequestClose={this.toggleDialog}
          >
            <RadioButtonGroup
              defaultSelected={this.props.isAuthenticated ? parseInt(this.props.authUser) : 'unauthenticated'} // eslint-disable-line
              onChange={(e, value) => {
                this.props.handleAuthChange(value);
                this.toggleDialog();
              }}
            >
              <RadioButton
                value="unauthenticated"
                label="(no authentication)"
              />
              { ApiUsers.map((elem, index) => (
                <RadioButton
                  value={index}
                  label={elem.username}
                />
              )) }
            </RadioButtonGroup>
          </Dialog>
        </div>
      </div>
    );
  }
}
AppHeader.propTypes = {
  authUser: React.PropTypes.string.isRequired,
  isAuthenticated: React.PropTypes.bool.isRequired,
  handleAuthChange: React.PropTypes.func.isRequired,
};

export default AppHeader;
