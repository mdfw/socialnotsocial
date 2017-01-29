import { connect } from 'react-redux';
import React from 'react';
import cookie from 'react-cookie';
import Home from './Home';
import Welcome from '../components/Welcome';
import HomeDirectorLogin from './HomeDirectorLogin';

/* Checks for the specific snssl cookie that indicates if someone is logged in.
 * The session may still be dead, but we'll skip the check if this cookie isn't there.
 * The snssl cookie is just an indicator of logged in status. It's separate from the
 *    snss session cookie, but that one is only http.
 */
function checkForSessionCookie() {
  const sessionCookieContent = cookie.load('snssl');
  if (sessionCookieContent && sessionCookieContent.length > 0) {
    return true;
  }
  return false;
}

/* Home director figures out where we are going to send our customer. If they are logged in,
 *   they will go to home, otherwise we might test a login or send them to the welcome screen.
 */
function HomeDirector(props) {
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
