import React from 'react';
import { Link } from 'react-router';
import { AppBar, SelectField, MenuItem } from 'material-ui';
import { blue900 } from 'material-ui/styles/colors';
import ApiUsers from '../../utils/ApiUsers';

const prepareUser = (u) => (
  <span>
    { u._links && u._links.image ?
      <img alt={u.name} src={u._links.image.href} height="16px" /> :
      <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
    }
    &nbsp;&nbsp;&nbsp;
    <i>{u.nickname}</i>
  </span>
);

class AppHeader extends React.Component { // eslint-disable-line
  constructor(props) {
    super(props);
    this.toggleDialog = this.toggleDialog.bind(this);
  }

  toggleDialog() {
    this.setState({ dialogOpen: !this.state.dialogOpen });
  }

  render() {
    return (
      <div>
        <AppBar
          title={<Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Issue Tracker</Link>}
          showMenuIconButton={false}
          iconElementRight={
            <SelectField
              value={this.props.isAuthenticated ? this.props.authUser + 1 : 0}
              style={{ width: 160, top: 0, right: 10, verticalAlign: 'middle' }}
              selectedMenuItemStyle={{ color: blue900 }}
              labelStyle={{ color: '#fff', fontSize: 14 }}
              onChange={(e, value) => this.props.handleAuthChange(value - 1)}
            >
              <MenuItem key={0} value={0} primaryText="Unauthenticated" style={{ textAlign: 'center' }} />
              { ApiUsers.map((u, index) => <MenuItem key={index + 1} value={index + 1} primaryText={prepareUser(u)} style={{ textAlign: 'center' }} />) }
            </SelectField>
          }
          style={{ position: 'fixed', top: 0 }}
        />
      </div>
    );
  }
}
AppHeader.propTypes = {
  authUser: React.PropTypes.number,
  isAuthenticated: React.PropTypes.bool.isRequired,
  handleAuthChange: React.PropTypes.func.isRequired,
};

export default AppHeader;
