import { connect } from 'react-redux';
import React from 'react';
import cookie from 'react-cookie';
import Home from './Home';
import Welcome from '../components/Welcome';
import HomeDirectorLogin from './HomeDirectorLogin';

function checkForSessionCookie() {
  const sessionCookieContent = cookie.load('snssl');
  if (sessionCookieContent && sessionCookieContent.length > 0) {
    console.log('Found a session cookie');
    return true;
  }
  console.log('Did not found a session cookie');
  return false;
}

function HomeDirector(props) {
  console.log(`At home authenticated: ${props.authenticated} id: ${props.accountId}`);
  let direction = <Welcome />;
  if (props.authenticated && props.accountId) {
    direction = <Home />;
  } else if (checkForSessionCookie()) {
    direction = <HomeDirectorLogin />;
  }
  return (
    <div id="home">
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
