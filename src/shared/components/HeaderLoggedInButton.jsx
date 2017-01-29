import { connect } from 'react-redux';
import React from 'react';
// import { push } from 'react-router-redux';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import { logoutAccount } from '../actions/account';

const welcomeButtonStyle = {
  float: 'right',
  fontSize: '16px',
  fontWeight: 700,
  padding: '10px 20px 10px 20px',
  textDecoration: 'none',
  backgroundColor: '#459691',
  border: 0,
  outline: 0,
  cursor: 'pointer',
};

const headerRightStyle = {
  display: 'flex',
  alignItems: 'center',
  height: '50px',
};

const buttonTextStyle = {
  marginRight: '15px',
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
    const welcomeText = `Welcome, ${this.props.displayName}`;
    return (
      <span id="HeaderRight" style={headerRightStyle}>
        <button type="button" style={welcomeButtonStyle} onClick={this.handleButtonTap}>
          <span style={buttonTextStyle}>{welcomeText}</span>
          <img
            className="logo"
            src="assets/sun.svg"
            alt="settings"
            width="20"
            height="20"
          />
        </button>
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

