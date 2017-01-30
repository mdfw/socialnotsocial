require("source-map-support").install();
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _http = __webpack_require__(1);
	
	var _http2 = _interopRequireDefault(_http);
	
	var _httpProxy = __webpack_require__(2);
	
	var _httpProxy2 = _interopRequireDefault(_httpProxy);
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _helmet = __webpack_require__(4);
	
	var _helmet2 = _interopRequireDefault(_helmet);
	
	var _morgan = __webpack_require__(5);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	__webpack_require__(6);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Set up proxy routes to the api server */
	/* Core imports */
	var apiServerPort = process.env.API_SERVER_PORT;
	
	// import React from 'react';
	// import { renderToString } from 'react-dom/server';
	// import { RoutingContext, match } from 'react-router';
	/* Routes */
	// import routes from '../shared/routes';
	/* Configurations */
	
	if (!apiServerPort) {
	  apiServerPort = 3006;
	}
	var apiProxy = _httpProxy2.default.createProxyServer();
	var apiServer = 'http://localhost:' + apiServerPort;
	
	var ourPort = process.env.MAIN_SERVER_PORT;
	if (!ourPort) {
	  ourPort = 3001;
	}
	
	var app = (0, _express2.default)();
	
	/* Configure middleware */
	/* Helmet - help secure Express/Connect apps with various HTTP headers */
	app.use((0, _helmet2.default)());
	app.use((0, _morgan2.default)('combined'));
	app.use(_express2.default.static('build/public'));
	
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
	
	var server = _http2.default.createServer(app);
	server.listen(ourPort);
	server.on('listening', function reportOnListen(error) {
	  if (error) {
	    console.log('Main Server ERROR on startup: ' + error);
	  } else {
	    console.log('Main Server listening on http://localhost:' + ourPort + '.');
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("http-proxy");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("helmet");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dotenv = __webpack_require__(7);
	
	var _dotenv2 = _interopRequireDefault(_dotenv);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* 'As early as possible in your application, require and configure dotenv.'
	 *   - https://www.npmjs.com/package/dotenv
	 */
	_dotenv2.default.config();
	
	// Bring in Envvars from .env.
	var envVars = ['REDIS_URL', 'MONGODB_URI', 'NODE_ENV', 'API_SERVER_PORT', 'MAIN_SERVER_PORT', 'ACCOUNT_PEPPER_1', 'ACCOUNT_ENCRYPT_CURRENT_PEPPER', 'IDIER_WORKER_ID'];
	
	// Check that Envvars are set.
	envVars.forEach(function (env) {
	  if (!process.env[env]) {
	    throw new Error('Environment variable ' + env + ' not set.');
	  }
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map