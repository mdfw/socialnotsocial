import { connect } from 'react-redux';
import React from 'react';
import SvgIcon from 'material-ui/SvgIcon';
import FlatButton from 'material-ui/FlatButton';
import { push } from 'react-router-redux';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import logoutAccount from '../actions/account';

/* eslint-disable max-len */
const SettingsIcon = props => (
  <SvgIcon {...props}>
    <path d="M450.6,300.4L510,256l-59.4-44.4l34.3-65.8l-72.8-14.2l2.3-74.1l-71.8,18.7L312.5,8.3L256,56.4L199.5,8.3l-30.1,67.8   L97.6,57.4l2.3,74.2l-72.8,14.2l34.3,65.8L2,256l59.4,44.4l-34.3,65.8l72.8,14.2l-2.3,74.1l71.8-18.7l30.1,67.8l56.5-48.1   l56.5,48.1l30.1-67.8l71.8,18.7l-2.3-74.1l72.8-14.2L450.6,300.4z M397.7,433.7l-64.2-16.7l-26.9,60.7l-50.6-43l-50.6,43   l-26.9-60.7l-64.2,16.7l2.1-66.4l-65.1-12.7l30.7-58.9L28.8,256l53.1-39.8l-30.7-58.9l65.2-12.7l-2.1-66.4l64.2,16.7l26.9-60.7   l50.6,43l50.6-43l26.9,60.7l64.2-16.7l-2.1,66.4l65.1,12.7l-30.7,58.9l53.1,39.8l-53.1,39.8l30.7,58.8l-65.2,12.7L397.7,433.7z" />
    <path d="M256,103.6c-84,0-152.4,68.4-152.4,152.4S172,408.4,256,408.4c84,0,152.4-68.4,152.4-152.4S340,103.6,256,103.6z    M256,392.3c-75.2,0-136.3-61.2-136.3-136.3S180.8,119.6,256,119.6c75.2,0,136.3,61.2,136.3,136.3S331.2,392.3,256,392.3z" />
  </SvgIcon>
);
/* eslint-enable max-len */

const svgStyle = {
  verticalAlign: 'middle',
  marginLeft: '20px',
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
      open: true,
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

  handleMenuItemTap(event, menuItem, index) {
    console.log(`handleMenuItemTap on ${index}`);
    console.dir(event);
    console.dir(menuItem);
  }

  render() {
    const welcomeText = `Welcome, ${this.props.displayName}`;
    return (
      <span id="HeaderRight">
        <FlatButton
          label={welcomeText}
          labelPosition="before"
          onTouchTap={this.handleButtonTap}
          icon={<SettingsIcon style={svgStyle} viewBox="0 0 512 640" />}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onItemTouchTap={this.handleMenuItemTap}>
            <MenuItem primaryText="Manage recipients" />
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

