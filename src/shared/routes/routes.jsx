import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../containers/App';
import HomeDirector from '../containers/HomeDirector';
import LoginPage from '../components/LoginPage';
import RegisterPage from '../components/RegisterPage';

/*
function requireAuth(state, nextState, replace) {
  if (!state.account.authenticated) {
    replace({
      pathname: '/app/login',
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
*/

export default function buildRoutes(store = {}) {
  // const state = store.getState();
  let history = browserHistory;

  if (store) {
    history = syncHistoryWithStore(browserHistory, store);
  }
/*
  const checkForAuth = function checkForAuth(nextState, replace) {
    return hasAuth(state, nextState, replace);
  };

  const needsAuth = function needsAuth(nextState, replace) {
    return requireAuth(state, nextState, replace);
  };
*/
  return (
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute
          component={HomeDirector}
        />
        <Route path="/login" component={LoginPage} />
        <Route path="/signup" component={RegisterPage} />
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
