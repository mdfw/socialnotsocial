import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import React from 'react';
import { Link } from 'react-router';
import AppBar from 'material-ui/AppBar';
import FlatButton from 'material-ui/FlatButton';

function handleTouchTap() {
  console.log('touched');
}

const Header = (props) => {
  let rightButtonDisabled = false;
  let rightButtonText = 'Login';
  let rightButtonURL = '/login';
  if (props.authenticated) {
    rightButtonDisabled = true;
    rightButtonText = `Welcome, ${props.displayName}`;
    rightButtonURL = '/'; 
  }
  return (
    <AppBar
      title={<span>Social, not social</span>}
      onTitleTouchTap={handleTouchTap}
      showMenuIconButton={false}
      iconElementRight={<FlatButton label={rightButtonText} disabled={rightButtonDisabled} />}
    />  
  );
};

Header.propTypes = {
  authenticated: React.PropTypes.bool,
  displayName: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    displayName: state.account.displayName,
  };
};

const Container = connect(mapStateToProps)(Header);

export default Container;
