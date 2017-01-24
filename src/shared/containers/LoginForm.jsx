import { connect } from 'react-redux';
import React from 'react';

function LoginForm(props) { // eslint-disable-line no-unused-vars
  return (
    <div id="login">
      Hi, you are logging in.
    </div>
  );
}


/** redux store map **/
const mapStateToProps = function mapStateToProps(state, ownprops) {
  return {
    children: ownprops.children,
  };
};

const Container = connect(mapStateToProps)(LoginForm);

export default Container;
