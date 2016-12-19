import React from 'react';
import { render } from 'react-dom';

import App from './components/app';

document.addEventListener('DOMContentLoaded', function() { // eslint-disable-line
  render(
    <App />,
    document.getElementById('app') // eslint-disable-line
  );
});
