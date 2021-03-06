/* Core imports */
import http from 'http';
import httpProxy from 'http-proxy';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import favicon from 'serve-favicon';

// import React from 'react';
// import { renderToString } from 'react-dom/server';
// import { RoutingContext, match } from 'react-router';
/* Routes */
// import routes from '../shared/routes';
/* Configurations */

import '../config/environment';

/* Set up proxy routes to the api server */
let apiServerPort = process.env.API_SERVER_PORT;
if (!apiServerPort) {
  apiServerPort = 3006;
}
const apiProxy = httpProxy.createProxyServer();
const apiServer = `http://localhost:${apiServerPort}`;

let ourPort = process.env.MAIN_SERVER_PORT;
if (!ourPort) {
  ourPort = 3001;
}

const app = express();

app.use(favicon('build/public/assets/favicon.ico'));

/* Configure middleware */
/* Helmet - help secure Express/Connect apps with various HTTP headers */
app.use(helmet());
app.use(morgan('combined'));

/* if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  app.get('*.js', (req, res, next) => {
    req.url = `${req.url}.gz`; // eslint-disable-line no-param-reassign
    res.set('Content-Encoding', 'gzip');
    next();
  });
}
*/
app.use(express.static('build/public'));

/* Proxy all api calls through to the api server */
app.all('/api/*', function allapiTraffic(req, res) {
  apiProxy.web(req, res, { target: apiServer });
});

/*
app.use((req, res) => {
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
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
*/

app.get('/*', function redirWelcome(req, res) {
  res.redirect('/');
});


const server = http.createServer(app);
const port = process.env.PORT || ourPort;
server.listen(port);
server.on('listening', function reportOnListen(error) {
  if (error) {
    console.log(`Main Server ERROR on startup: ${error}`);
  } else {
    console.log(`Main Server listening on http://localhost:${port}.`);
  }
});

module.exports = server;
