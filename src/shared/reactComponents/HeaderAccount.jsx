import React from 'react';
import { connect } from 'react-redux';

const HeaderAccount = function HeaderAccount(props) {
  let welcome = 'Welcome, please sign in.';
  if (props.authed) {
    welcome = `Welcome, ${props.displayName}`;
  }
  return (
    <div id="headerAccount">
      { welcome }
    </div>
  );
};

HeaderAccount.propTypes = {
  displayName: React.PropTypes.string,
  authed: React.PropTypes.func.bool,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    displayName: state.account.displayName,
    authed: state.account.authenticated,
  };
};


const Container = connect(mapStateToProps)(HeaderAccount);

export default Container;

