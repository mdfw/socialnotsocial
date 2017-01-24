import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../containers/App';
import Login from '../containers/LoginForm';
import Home from '../containers/Home';
import Register from '../containers/RegisterForm';

function requireAuth(store, nextState, replace) {
  if (!store.account.authenticated) {
    replace({
      pathname: '/app/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

function hasAuth(store, nextState, replace) {
  if (store.account.authenticated) {
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
    return hasAuth(store, nextState, replace);
  };

  const needsAuth = function needsAuth(nextState, replace) {
    return requireAuth(store, nextState, replace);
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute
          component={Register}
        />
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
