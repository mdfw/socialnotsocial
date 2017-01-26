import { connect } from 'react-redux';
import React from 'react';
import Home from './Home';
import RegisterOrLogin from './RegisterOrLogin';

function HomeDirector(props) {
  console.log(`At home authenticated: ${props.authenticated} id: ${props.accountId}`);
  let direction = <RegisterOrLogin />;
  if (props.authenticated && props.accountId) {
    direction = <Home />;
  }
  return (
    <div id="home">
      Hi, you are home.
      { direction }
    </div>
  );
}

HomeDirector.propTypes = {
  authenticated: React.PropTypes.bool,
  accountId: React.PropTypes.number,
};

/** redux store map **/
const mapStateToProps = function mapStateToProps(state) {
  return {
    authenticated: state.account.authenticated,
    accountId: state.account.accountId,
  };
};

const Container = connect(mapStateToProps)(HomeDirector);

export default Container;
