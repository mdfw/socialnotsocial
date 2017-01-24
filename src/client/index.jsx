import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import buildRoutes from '../shared/routes/routes';
import configureStore from '../shared/store';

const store = configureStore();
const routes = buildRoutes(store);

render((
  <Provider store={store}>
    {routes}
  </Provider>
), document.getElementById('react-view'));
