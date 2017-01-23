import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import App from '../reactComponents';
import Login from '../reactComponents';
import Home from '../reactComponents';

function requireAuth(store, nextState, replace) {
  if (!store.account.authenticated) {
    replace({
      pathname: '/app/login',
      state: { nextPathname: nextState.location.pathname },
    });
  }
}

export default function buildRoutes(store = {}) {
  let history = browserHistory;

  if (store) {
    history = syncHistoryWithStore(browserHistory, store);
  }

  return (
    <Router history={history}>
      <Route path="/app/login" component={Login} />
      <Route path="/app/" component={App}>
        <IndexRoute
          component={Home}
          onEnter={function authForHome(nextState, replace) {
            return requireAuth(store, nextState, replace);
          }}
        />
        <Route
          path="/app/posts/:id"
          component={Home}
          onEnter={function authForPostId(nextState, replace) {
            return requireAuth(store, nextState, replace);
          }}
        />
      </Route>;
    </Router>
  );
}
