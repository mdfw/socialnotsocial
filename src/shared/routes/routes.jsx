import React from 'react';
import cookie from 'react-cookie';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Home from '../containers/Home';
import App from '../containers/App';
import Welcome from '../components/Welcome';
import CheckLogin from '../containers/CheckLogin';
import Recipients from '../containers/Recipients';
import About from '../components/About';
import { COOKIE_NAME_INDICATE_SESSION } from '../../globalConstants';

/* Checks for the specific snssl cookie that indicates if someone is logged in.
 * The session may still be dead, but we'll skip the check if this cookie isn't there.
 * The snssl cookie is just an indicator of logged in status. It's separate from the
 *    snss session cookie, but that one is only http.
 */
function checkForSessionCookie() {
  const sessionCookieContent = cookie.load(COOKIE_NAME_INDICATE_SESSION);
  if (sessionCookieContent && sessionCookieContent.length > 0) {
    return true;
  }
  return false;
}


function requireAuth(state, nextState, replace) {
  if (!state.account.authenticated) {
    if (checkForSessionCookie()) {
      replace({
        pathname: '/checklogin',
        state: { nextPathname: nextState.location.pathname },
      });
      return;
    }
    replace({
      pathname: '/welcome',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function hasAuth(state, nextState, replace) {
  if (state.account.authenticated) {
    replace({
      pathname: '/app/',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}


export default function buildRoutes(store = {}) {
  let history = browserHistory;

  if (store) {
    history = syncHistoryWithStore(browserHistory, store);
  }

  const checkForAuth = function checkForAuth(nextState, replace) {
    return hasAuth(store.getState(), nextState, replace);
  };

  const needsAuth = function needsAuth(nextState, replace) {
    const curState = store.getState();
    return requireAuth(curState, nextState, replace);
  };

  return (
    <Router history={history}>
      <Redirect from="/login" to="/welcome" />
      <Redirect from="/signup" to="/welcome" />
      <Route path="/checklogin" component={CheckLogin} />
      <Route path="/about" component={About} />
      <Route path="/welcome" component={Welcome} onEnter={checkForAuth} />
      <Route path="/" component={App} onEnter={needsAuth}>
        <IndexRoute component={Home} />
        <Route path="/recipients" component={Recipients} onEnter={needsAuth} />
      </Route>
    </Router>
  );
}

/*
        <Route
          path="/app/register"
          component={Register}
        />
          <Route
          path="/app/login"
          component={Login}
          onEnter={checkForAuth}
        />
        <IndexRoute
          component={Home}
          onEnter={needsAuth}
        />
        <Route
          path="/app/posts/:id"
          component={Home}
          onEnter={needsAuth}
        />


*/
