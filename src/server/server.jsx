/* eslint-disable import/first */

import { renderToString } from 'react-dom/server';
import { RoutingContext, match } from 'react-router';
import express from 'express';
import React from 'react';
import routes from '../shared/routes';
import http from 'http';
import httpProxy from 'http-proxy';
import helmet from 'helmet';

const apiProxy = httpProxy.createProxyServer();
const apiServer = 'http://localhost:3005';
const app = express();

/* eslint-enable import/first */

/* Note: most of this file is just temporary. */
app.use(helmet());

app.use(express.static('public'));

app.all('/api/*', function allapiTraffic(req, res) {
  apiProxy.web(req, res, { target: apiServer });
});

app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => { // eslint-disable-line consistent-return, max-len
    if (err) {
      console.error(err);
      return res.status(500).end('Internal server error');
    }
    if (!renderProps) return res.status(404).end('Not found.');

    const InitialComponent = (
      <RoutingContext {...renderProps} />
    );
    const componentHTML = renderToString(InitialComponent);
    const HTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Isomorphic Redux Demo</title>
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript" src="/bundle.js"></script>
      </body>
  </html>
`;
    res.end(HTML);
  });
});
const server = http.createServer(app);
server.listen(3003);
server.on('listening', () => {
  console.log('Main Server listening on 3003');
});
