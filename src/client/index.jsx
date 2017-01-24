import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, history }   from 'react-router';
import buildRoutes from '../shared/routes/routes';
import configureStore from '../shared/store';

const store = configureStore();
  console.log('Passing a store along: ');
  console.dir(store);

const routes = buildRoutes(store);
console.log('Routes');
console.dir(routes);

render((
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>
), document.getElementById('react-view'));
