import React from 'react';
import { connect } from 'react-redux';

const HeaderAccount = function HeaderAccount(props) {
  let welcome = 'Welcome, please sign in.';
  if (props.authed) {
    welcome = `Welcome, ${props.displayName}`;
  } else if (props.location === '/register') {
    welcome = 'Log into an existing account.';
  }
  return (
    <div id="headerAccount">
      { welcome }
    </div>
  );
};

HeaderAccount.propTypes = {
  displayName: React.PropTypes.string,
  authed: React.PropTypes.bool,
  location: React.PropTypes.string,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    displayName: state.account.displayName,
    authed: state.account.authenticated,
    location: state.location,
  };
};


const Container = connect(mapStateToProps)(HeaderAccount);

export default Container;

