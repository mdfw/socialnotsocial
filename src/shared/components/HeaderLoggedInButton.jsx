import { connect } from 'react-redux';
import React from 'react';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { IconButton } from 'material-ui';
import SettingsButton from 'material-ui/svg-icons/navigation/arrow-drop-down';
import { logoutAccount } from '../actions/account';

const headerRightStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '50px',
};


class HeaderLoggedButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleButtonTap = this.handleButtonTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMenuItemTap = this.handleMenuItemTap.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  handleButtonTap(event) {
    event.preventDefault();
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget,
    });
  }

  handleSignOut() {
    this.props.dispatch(logoutAccount());
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

//   handleMenuItemTap(event, menuItem) {  <--storing in case we need it.
  handleMenuItemTap(event) {
    this.setState({
      open: false,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    const welcomeText = `For: ${this.props.displayName}`;
    return (
      <span id="HeaderRight" style={headerRightStyle}>
        <span className="top-navigation-user">{welcomeText}</span>
        <IconButton tooltip="Settings" onClick={this.handleButtonTap}>
          <SettingsButton color="white" />
        </IconButton>

        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onItemTouchTap={this.handleMenuItemTap}>
            <MenuItem primaryText="Manage recipients" disabled={true} />
            <MenuItem primaryText="Sign out" onTouchTap={this.handleSignOut} />
          </Menu>
        </Popover>
      </span>
    );
  }
}

HeaderLoggedButton.propTypes = {
  displayName: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

const Container = connect()(HeaderLoggedButton);

export default Container;

