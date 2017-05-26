// import { connect } from 'react-redux';
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


class HeaderLoggedInButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleButtonTap = this.handleButtonTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMenuItemTap = this.handleMenuItemTap.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleShowRecipients = this.handleShowRecipients.bind(this);
    this.handleGoHome = this.handleGoHome.bind(this);
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
  handleShowRecipients() {
    this.props.routerpush('/recipients');
  }
  handleGoHome() {
    console.log('going home');
    this.props.routerpush('/');
  }
//   handleMenuItemTap(event, menuItem) {  <--storing in case we need it.

  handleMenuItemTap(event) {
    this.setState({
      open: false,
      anchorEl: event.currentTarget,
    });
  }

  render() {
    const welcomeText = `${this.props.displayName}`;
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
            <MenuItem primaryText="Home" onTouchTap={this.handleGoHome} />
            <MenuItem primaryText="Manage recipients" onTouchTap={this.handleShowRecipients} />
            <MenuItem primaryText="Sign out" onTouchTap={this.handleSignOut} />
          </Menu>
        </Popover>
      </span>
    );
  }
}

HeaderLoggedInButton.defaultProps = {
  displayName: 'Guest',
};

HeaderLoggedInButton.propTypes = {
  displayName: React.PropTypes.string,
  dispatch: React.PropTypes.func.isRequired,
  routerpush: React.PropTypes.func.isRequired,
};
/*
const Container = connect()(HeaderLoggedInButton);

export default Container;
*/
export default HeaderLoggedInButton;
