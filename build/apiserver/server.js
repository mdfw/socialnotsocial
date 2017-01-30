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
	
	var _bodyParser = __webpack_require__(2);
	
	var _bodyParser2 = _interopRequireDefault(_bodyParser);
	
	var _express = __webpack_require__(3);
	
	var _express2 = _interopRequireDefault(_express);
	
	var _expressSession = __webpack_require__(4);
	
	var _expressSession2 = _interopRequireDefault(_expressSession);
	
	var _morgan = __webpack_require__(5);
	
	var _morgan2 = _interopRequireDefault(_morgan);
	
	var _passport = __webpack_require__(6);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _modules = __webpack_require__(7);
	
	__webpack_require__(35);
	
	var _mongoConnect = __webpack_require__(37);
	
	var _mongoConnect2 = _interopRequireDefault(_mongoConnect);
	
	var _redisConnect = __webpack_require__(38);
	
	var _redisConnect2 = _interopRequireDefault(_redisConnect);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Routes */
	/* Base imports */
	var RedisStore = __webpack_require__(40)(_expressSession2.default);
	/* Configurations */
	
	
	var port = process.env.API_SERVER_PORT;
	if (!port) {
	  port = 3006;
	}
	
	var app = (0, _express2.default)();
	
	/* Middleware setup */
	app.use(function (err, req, res, next) {
	  if (res.headersSent) next(err);
	  res.status(err.status || port).render('500');
	});
	app.use(_bodyParser2.default.json());
	app.use(_bodyParser2.default.urlencoded({ extended: true }));
	app.use((0, _expressSession2.default)({
	  name: 'snss',
	  secret: 'MmyWTLNNsTi15LYHz8FP',
	  resave: true,
	  saveUninitialized: false,
	  store: new RedisStore({ client: _redisConnect2.default })
	}));
	app.use(_passport2.default.initialize());
	app.use(_passport2.default.session());
	app.use((0, _morgan2.default)('combined'));
	
	/* Routes */
	app.use('/api/v1', [_modules.accountRoutes, _modules.recipientRoutes, _modules.authenticationRoutes, _modules.postRoutes]);
	
	app.get('/', function baseReturn(req, res) {
	  res.send('Hello - this is the api server. You probably want a more interesting endpoint.');
	});
	
	process.on('SIGTERM', function () {
	  console.log('Closing server.');
	  app.close();
	});
	
	app.on('close', function () {
	  console.log('Closing redis.');
	  _redisConnect2.default.quit();
	  _mongoConnect2.default.close();
	});
	
	/* Start the API Server */
	var server = (0, _http.Server)(app);
	server.listen(port, function reportOnListen(error) {
	  if (error) {
	    console.log('API Server ERROR on startup: ' + error);
	  } else {
	    console.log('API Server listening on http://localhost:' + port + '.');
	  }
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("http");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 4 */
/***/ function(module, exports) {

	module.exports = require("express-session");

/***/ },
/* 5 */
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = require("passport");

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _Account = __webpack_require__(8);
	
	Object.keys(_Account).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Account[key];
	    }
	  });
	});
	
	var _Recipient = __webpack_require__(27);
	
	Object.keys(_Recipient).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Recipient[key];
	    }
	  });
	});
	
	var _Authentication = __webpack_require__(22);
	
	Object.keys(_Authentication).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Authentication[key];
	    }
	  });
	});
	
	var _Post = __webpack_require__(31);
	
	Object.keys(_Post).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _Post[key];
	    }
	  });
	});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.AccountController = exports.Account = exports.accountRoutes = undefined;
	
	var _routes = __webpack_require__(9);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _model = __webpack_require__(11);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _controller = __webpack_require__(10);
	
	var AccountController = _interopRequireWildcard(_controller);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.accountRoutes = _routes2.default;
	exports.Account = _model2.default;
	exports.AccountController = AccountController;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _controller = __webpack_require__(10);
	
	var _Authentication = __webpack_require__(22);
	
	var routes = new _express.Router();
	
	routes.route('/account').post(_controller.addAccountEndpoint);
	
	routes.get('/account', (0, _Authentication.ensureLoggedIn)(), _controller.getAccountInfoEndpoint);
	
	exports.default = routes;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.getAccountInfoEndpoint = exports.updateAccountEndpoint = exports.addAccountEndpoint = undefined;
	
	var _model = __webpack_require__(11);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Returns either the current account's accountId or, if onBehalfOfId is passed in
	 *  to the body, it will verify if the current account can act on behalf of the passed
	 *  in id and return that.
	 *  @param {object} req - the request object that has a user account attached
	 *  @returns {string} accountId - the accountId to use in searches.
	 *   TODO: need to move it to it's own module since we're duplicating it in every controller.
	 */
	var activeAccountId = function getAccount(req) {
	  var currentAccount = req.user;
	  var onBehalfOfId = req.body.onBehalfOfId;
	  if (onBehalfOfId && onBehalfOfId.length > 0) {
	    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {
	      return onBehalfOfId;
	    }
	  }
	  if (req.user && req.user.accountId) {
	    return req.user.accountId;
	  }
	  return null;
	};
	
	/* Adds an account to the Accounts database based on the fields passed in.
	 * Params needed in body:
	 *   @param {string} email - the email address
	 *   @param {string} password - the user's password. Must pass owasp tests.
	 *   @param {string} displayName - the name to display on the users page.
	 */
	var addAccountEndpoint = function addAccountEndpoint(req, res) {
	  var _req$body = req.body,
	      email = _req$body.email,
	      password = _req$body.password,
	      displayName = _req$body.displayName;
	
	  var newAccount = new _model2.default({ email: email, password: password, displayName: displayName });
	  newAccount.setPassword(password).then(function () {
	    // eslint-disable-line arrow-body-style
	    return newAccount.save();
	  }).then(function (createdAccount) {
	    var cleanedAccount = createdAccount.toJSON();
	    res.status(201).json({
	      success: true,
	      message: 'Successfully Registered',
	      account: cleanedAccount
	    });
	  }).catch(function (err) {
	    if (err.code === 11000) {
	      res.statusMessage = 'Account with that email already exists'; // eslint-disable-line no-param-reassign
	      res.status(409).end();
	      return;
	    }
	    var errorMessage = 'Account could not be created.';
	    if (err.message) {
	      errorMessage = err.message;
	    }
	    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  });
	};
	
	/* Get account info for accountId.
	 * Params needed in req.body:
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the search parameters.
	 */
	var getAccountInfoEndpoint = function getAccountInfoEndpoint(req, res) {
	  // eslint-disable-line consistent-return
	  var accountId = activeAccountId(req);
	  if (!accountId) {
	    return res.status(422).json({ success: false, message: 'No accountId provided' });
	  }
	  _model2.default.findOneAccount(accountId, false).then(function (item) {
	    var cleanedItem = item.toJSON();
	    res.status(201).json({
	      success: true,
	      account: cleanedItem
	    });
	  }).catch(function (err) {
	    res.statusMessage = err.message; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  });
	};
	
	var updateAccountEndpoint = function updateAccountEndpoint(req, res) {
	  res.status(418).json({
	    message: 'Brewing'
	  });
	};
	
	exports.addAccountEndpoint = addAccountEndpoint;
	exports.updateAccountEndpoint = updateAccountEndpoint;
	exports.getAccountInfoEndpoint = getAccountInfoEndpoint;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(12);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _passwordEncryption = __webpack_require__(13);
	
	var _idier = __webpack_require__(16);
	
	var _appraise = __webpack_require__(19);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* The various states an account can be in. Used in the schema for account.accountType.
	 */
	var AccountType = {
	  NORMAL: 'normal',
	  ADMIN: 'admin',
	  CUSTSERVICE: 'custservice',
	  BANNED: 'banned'
	};
	
	/* Account schema represents all accounts.
	 * Note: We are not using the pepperId yet, there's only one pepper
	 */
	var AccountSchema = new _mongoose.Schema({
	  accountId: {
	    type: _mongoose.Schema.Types.Number,
	    unique: true,
	    required: true
	  },
	  accountType: {
	    type: String,
	    enum: [AccountType.NORMAL, AccountType.ADMIN, AccountType.CUSTSERVICE, AccountType.BANNED],
	    default: AccountType.NORMAL
	  },
	  email: {
	    type: String,
	    trim: true,
	    unique: true,
	    lowercase: true
	  },
	  displayName: {
	    type: String,
	    trim: true
	  },
	  encryptedPasswordHash: {
	    type: String,
	    trim: true,
	    required: true
	  },
	  encryptedPasswordPepperId: {
	    type: String
	  },
	  dateCreated: {
	    type: Date,
	    default: Date.now
	  },
	  dateAccountValidated: {
	    type: Date
	  },
	  dateUpdated: {
	    type: Date,
	    default: Date.now
	  }
	});
	
	/* Remove password and pepper from exported json && object
	 * Based on: http://ksloan.net/tips-for-using-mongoose-schemas-with-express-mongo-express-node-stack/
	 */
	AccountSchema.set('toJSON', {
	  transform: function transformJSON(doc, objRepresentation) {
	    delete objRepresentation.encryptedPasswordHash; // eslint-disable-line no-param-reassign
	    delete objRepresentation.passwordEncryptionPepperId; // eslint-disable-line no-param-reassign
	    return objRepresentation;
	  }
	});
	
	AccountSchema.set('toJSON', {
	  transform: function transformJSON(doc, objRepresentation) {
	    return {
	      displayName: objRepresentation.displayName,
	      email: objRepresentation.email,
	      dateCreated: objRepresentation.dateCreated,
	      dateAccountValidated: objRepresentation.dateAccountValidated,
	      dateUpdated: objRepresentation.dateUpdated,
	      accountId: objRepresentation.accountId,
	      accountType: objRepresentation.accountType
	    };
	  }
	});
	
	AccountSchema.set('toObject', {
	  transform: function transformObject(doc, objRepresentation) {
	    delete objRepresentation.encryptedPasswordHash; // eslint-disable-line no-param-reassign
	    delete objRepresentation.passwordEncryptionPepperId; // eslint-disable-line no-param-reassign
	    return objRepresentation;
	  }
	});
	
	/* Sets the account password (technically, encryptedPasswordHash)
	 * Sends the password through hashing and encryption and saves it the the database.
	 * returns {Promise}
	 */
	AccountSchema.methods.setPassword = function setPassword(password) {
	  var self = this;
	
	  return Promise.resolve((0, _appraise.appraisePassword)(password)).then(function checkAppraisal(appraisalMessages) {
	    if (appraisalMessages.length > 0) {
	      throw new Error(appraisalMessages.join(', '));
	    }
	    return password;
	  }).then(function runHashing(passwordValue) {
	    return (0, _passwordEncryption.encryptPassword)(passwordValue);
	  }).then(function (encryptedValue) {
	    console.log('Got encrypted value: ');
	    console.dir(encryptedValue);
	    self.encryptedPasswordHash = encryptedValue.encrypted;
	    self.encryptedPasswordPepperId = encryptedValue.pepperId;
	  }).catch(function (err) {
	    throw err;
	  });
	};
	
	/* If we don't have an accountID (say, on a new account), set one. */
	AccountSchema.pre('validate', function preValidateAddAccountId(next) {
	  if (!this.accountId) {
	    this.accountId = (0, _idier.idier)();
	  }
	  next();
	});
	
	/* Update the dateUpdated field on save. */
	AccountSchema.pre('save', true, function updateDate(next, done) {
	  this.dateUpdated = new Date();
	  next();
	  done();
	});
	
	/* Does the pre-save validations.
	 * Why here instead of on each individual field? Allows us to return multiple errors at once.
	 */
	AccountSchema.pre('save', true, function preSaveValidations(next, done) {
	  var errorMessages = [];
	  var emailAppraisal = (0, _appraise.appraiseEmail)(this.email);
	  if (emailAppraisal.length > 0) {
	    this.invalidate('email', emailAppraisal.join(', '));
	    errorMessages.push(emailAppraisal.join(', '));
	  }
	
	  var displayNameAppraisal = (0, _appraise.appraiseDisplayName)(this.displayName);
	  if (displayNameAppraisal.length > 0) {
	    this.invalidate('displayName', displayNameAppraisal.join(', '));
	    errorMessages.push(displayNameAppraisal.join(' '));
	  }
	  if (errorMessages.length > 0) {
	    done(new Error(errorMessages.join(' ')));
	  }
	  next();
	  done();
	});
	
	AccountSchema.methods.comparePassword = function comparePassword(candidate) {
	  return (0, _passwordEncryption.passwordsMatch)(candidate, this.encryptedPasswordHash, this.encryptedPasswordPepperId);
	};
	
	/* Can this account act on behalf of another account?
	 * @param {number} *ignored* the Account id to check against.
	 * @returns {bool} true if account can act on behalf of accountId
	 * @note Currently, only checks if this account has an account type of admin or customer service
	*/
	AccountSchema.methods.canActOnBehalfOf = function canActOnBehalfOf(accountId) {
	  // eslint-disable-line
	  if (this.accountType === AccountType.ADMIN || this.accountType === AccountType.CUSTSERVICE) {
	    return true;
	  }
	  return false;
	};
	
	/* Find an account by an accountId
	 * @param {number} accountId - the account id
	 * @returns {promise} - a promise to find something
	 */
	AccountSchema.statics.findOneAccount = function findAccountById(accountId) {
	  return this.findOne({ accountId: accountId }).exec();
	};
	
	/* Find an account by an email address
	 * @param {string} email - the associated email address
	 * @returns {promise} - a promise to find something
	 */
	AccountSchema.statics.findOneByEmail = function findAccountByEmail(email) {
	  return this.findOne({ email: email }).exec();
	};
	
	/* Compile the schema into a model
	 * http://mongoosejs.com/docs/models.html
	 */
	var Account = _mongoose2.default.model('Account', AccountSchema);
	
	exports.default = Account;

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = require("mongoose");

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.passwordsMatch = exports.aesHash = exports.bcryptHash = exports.hashPassword = exports.deAesHash = exports.encryptPassword = undefined;
	
	var _bcrypt = __webpack_require__(14);
	
	var _crypto = __webpack_require__(15);
	
	var _crypto2 = _interopRequireDefault(_crypto);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Hashes the password into a SHA512 hex hash */
	var hashPassword = function hashPassword(password) {
	  var hasher = _crypto2.default.createHash('sha512');
	  hasher.update(password);
	  var hashed = hasher.digest('hex');
	  return hashed;
	};
	
	/* Bcrypts a string (expects a hash) with 10 rounds and a per user salt
	 * Salt is returned as part of the hash and thus saved.
	 * Note that this version of bcrypt only takes the first 72 characters.
	  */
	var bcryptHash = function bcryptHash(passwordhash) {
	  var saltRounds = 10;
	  return (0, _bcrypt.hash)(passwordhash, saltRounds);
	};
	
	/* Encrypts the bcrypted string using aes256 using a pepper stored
	 *   in the environment. This is what should be finally saved.
	 */
	var aesHash = function aesHash(passwordhash) {
	  var currentPepperId = process.env.ACCOUNT_ENCRYPT_CURRENT_PEPPER;
	  var pepper = process.env[currentPepperId];
	  var algorithm = 'aes-256-ctr';
	  var cipher = _crypto2.default.createCipher(algorithm, pepper);
	  var crypted = cipher.update(passwordhash, 'utf8', 'hex');
	  crypted += cipher.final('hex');
	  return { encrypted: crypted, pepperId: currentPepperId };
	};
	
	/* Encrypting a password.
	   Follows dropbox's pattern of hashing, bcrypting, then encrypting.
	   Seems safer: https://blogs.dropbox.com/tech/2016/09/how-dropbox-securely-stores-your-passwords/
	*/
	var encryptPassword = function encryptPassword(rawPassword) {
	  return Promise.resolve(rawPassword).then(hashPassword).then(bcryptHash).then(aesHash);
	};
	
	/* Decrypts the encrypted bcrypt hash using aes256 using a pepper stored
	 *   in the environment. Should use this only with the bcrypted, hashed password.
	 */
	var deAesHash = function deAesHash(passwordhash, pepperId) {
	  var pepper = process.env[pepperId];
	  if (!pepper) {
	    return new Error('Pepper not found.');
	  }
	  var algorithm = 'aes-256-ctr';
	  var decipher = _crypto2.default.createDecipher(algorithm, pepper);
	  var decrypted = decipher.update(passwordhash, 'hex', 'utf8');
	  decrypted += decipher.final('utf8');
	  return decrypted;
	};
	
	/* Compare passwords.
	 * Because we are using hashing and encrypting, we have to do that before we compare.
	 */
	var passwordsMatch = function passwordsMatch(candidatePassword, encryptedPasswordHash, pepperId) {
	  // compare the submitted password to encrypted password in database.
	  var candidateHashed = hashPassword(candidatePassword);
	  var decryptedPass = deAesHash(encryptedPasswordHash, pepperId);
	  return (0, _bcrypt.compare)(candidateHashed, decryptedPass);
	};
	
	exports.encryptPassword = encryptPassword;
	exports.deAesHash = deAesHash;
	exports.hashPassword = hashPassword;
	exports.bcryptHash = bcryptHash;
	exports.aesHash = aesHash;
	exports.passwordsMatch = passwordsMatch;

/***/ },
/* 14 */
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = require("crypto");

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.passGen = exports.toNumericId = exports.toHumanId = exports.idier = undefined;
	
	var _base = __webpack_require__(17);
	
	var _base2 = _interopRequireDefault(_base);
	
	var _generatePassword = __webpack_require__(18);
	
	var _generatePassword2 = _interopRequireDefault(_generatePassword);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* idier: identifier generator. Inspired by twitter's snowflake system
	 * https://blog.twitter.com/2010/announcing-snowflake
	 * We use the timestamp converted to seconds + a worker id from the environment +
	 *   a sequence number (see below) + a single random number just in case...
	 */
	var idier = function idier() {
	  /* The sequence is stored on the global object. The sequence should be between 1-999 to keep
	   *   our total id number in the right space to be converted.
	   *   Note: There's probably an opportunity to use Redis or similar for the sequence.
	   */
	  var mySequence = 1;
	  var globalSeq = global.idierSequence;
	  if (globalSeq && globalSeq < 1000 && globalSeq > 0) {
	    mySequence = globalSeq;
	    global.idierSequence += 1;
	  } else {
	    global.idierSequence = mySequence + 1;
	  }
	
	  var workerId = process.env.IDIER_WORKER_ID;
	  if (!workerId) {
	    workerId = Math.floor(Math.random() * 10);
	  }
	  var timeStamp = Math.floor(Date.now() / 1000);
	  var randomnumber = Math.floor(Math.random() * 10);
	  var snowflake = '' + timeStamp + workerId + mySequence + randomnumber;
	  var snowflakeInt = parseInt(snowflake, 10);
	  return snowflakeInt;
	};
	
	/* toHumanId - transform a number into a base58 encoded string for use in human visible tokens.
	   Uses https://www.npmjs.com/package/base58
	  */
	var toHumanId = function toHumanId(idNumber) {
	  var encoded = _base2.default.encode(idNumber);
	  return encoded;
	};
	
	/* toNumbericId - transform a humanId (base32 encoded) string to a number to use by the computer.
	  */
	var toNumericId = function toNumericId(idString) {
	  var decoded = _base2.default.decode(idString);
	  return decoded;
	};
	
	/* Password generator
	 * Creates a 12 digit password with letters and numbers.
	*/
	var passGen = function passGen() {
	  var password = _generatePassword2.default.generate({
	    length: 12,
	    numbers: true
	  });
	  return password;
	};
	
	exports.idier = idier;
	exports.toHumanId = toHumanId;
	exports.toNumericId = toNumericId;
	exports.passGen = passGen;

/***/ },
/* 17 */
/***/ function(module, exports) {

	module.exports = require("base58");

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = require("generate-password");

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.appraisePostMessage = exports.appraisePostSubject = exports.appraiseAccountId = exports.appraisePasswordErrors = exports.appraisePasswordExtra = exports.appraisePassword = exports.appraiseDisplayName = exports.appraiseEmail = exports.appraiseThese = undefined;
	
	var _validator = __webpack_require__(20);
	
	var _owaspPasswordStrengthTest = __webpack_require__(21);
	
	var _owaspPasswordStrengthTest2 = _interopRequireDefault(_owaspPasswordStrengthTest);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Is the email valid? Uses the validator library to test.
	 */
	var appraiseEmail = function appraiseEmail(emailAddress) {
	  var messages = [];
	  if ((0, _validator.isEmpty)(emailAddress)) {
	    messages.push('Email address is required.');
	  }
	  if (!(0, _validator.isEmpty)(emailAddress) && !(0, _validator.isEmail)(emailAddress)) {
	    messages.push('Email address does not appear to be valid.');
	  }
	  return messages;
	};
	
	/* Test for the validity of the displayName.
	 *  Currently only checks if it's empty.
	 */
	var appraiseDisplayName = function appraiseDisplayName(displayName) {
	  var messages = [];
	  if ((0, _validator.isEmpty)(displayName)) {
	    messages.push('Display name is required.');
	  }
	  return messages;
	};
	
	/* Tests a password.
	 * Must be valid and pass the owasp validation tests.
	 */
	var appraisePassword = function appraisePassword(password) {
	  var messages = [];
	  if ((0, _validator.isEmpty)(password)) {
	    messages.push('Password is required.');
	  } else {
	    var owaspResults = _owaspPasswordStrengthTest2.default.test(password);
	    if (!owaspResults.strong) {
	      messages = messages.concat(owaspResults.errors);
	    }
	  }
	  return messages;
	};
	
	var appraisePasswordErrors = {
	  minLength: 0,
	  maxLength: 1,
	  repeating: 2,
	  needLowercase: 3,
	  needUppercase: 4,
	  needNumber: 5,
	  needCharacter: 6
	};
	
	/* A wrapper for awasp tests that returns this
	 * {
	 *   errors              : [],
	 *   failedTests         : [],
	 *   requiredTestErrors  : [],
	 *   optionalTestErrors  : [],
	 *   passedTests         : [ 0, 1, 2, 3, 4, 5, 6 ],
	 *   isPassphrase        : false,
	 *   strong              : true,
	 *   optionalTestsPassed : 4
	 * }
	 */
	var appraisePasswordExtra = function appraisePasswordExtra(password) {
	  return _owaspPasswordStrengthTest2.default.test(password);
	};
	
	/* Tests for the presense of an accountID.
	 *  Only checks if it's empty.
	 *  TODO: Check if the account actually exists.
	 */
	var appraiseAccountId = function appraiseAccountId(accountId) {
	  var messages = [];
	  if ((0, _validator.isEmpty)(accountId)) {
	    messages.push('AccountId is required.');
	  }
	  return messages;
	};
	
	/* Validates multiple options. Pass in an object with one of the following:
	 * email: {string} validates an email (or empty}
	 * displayName; {string} checks for empty
	 * password: {string} validates a password
	 * accountId: {string} validates the accountId
	 * @returns: an object (see validator object below)
	 */
	var appraiseThese = function appraiseThese(what) {
	  var appraised = {
	    success: true, // Did all tests pass
	    tested: [], // Which tests where done? Check this to make sure things were passed in correctly.
	    errors: {} };
	  if ('email' in what) {
	    appraised.tested.push('email');
	    var messages = appraiseEmail(what.email);
	    if (messages && messages.length > 0) {
	      appraised.success = false;
	      appraised.errors.email = messages;
	    }
	  }
	  if ('password' in what) {
	    appraised.tested.push('password');
	    var _messages = appraisePassword(what.password);
	    if (_messages && _messages.length > 0) {
	      appraised.success = false;
	      appraised.errors.password = _messages;
	    }
	  }
	  if ('displayName' in what) {
	    appraised.tested.push('displayName');
	    var _messages2 = appraiseDisplayName(what.displayName);
	    if (_messages2 && _messages2.length > 0) {
	      appraised.success = false;
	      appraised.errors.displayName = _messages2;
	    }
	  }
	  if ('accountId' in what) {
	    appraised.tested.push('accountId');
	    var _messages3 = appraiseAccountId(what.accountId);
	    if (_messages3 && _messages3.length > 0) {
	      appraised.success = false;
	      appraised.errors.accountId = _messages3;
	    }
	  }
	  return appraised;
	};
	
	/* Tests for the presense of a post message.
	 *  Only checks if it's empty.
	 *  Here for future functionality.
	 */
	var appraisePostMessage = function appraisePostMessage(postMessage) {
	  var messages = [];
	  if (!postMessage || (0, _validator.isEmpty)(postMessage)) {
	    messages.push('A message is required.');
	  }
	  return messages;
	};
	
	/* Tests for the presense of a post subject.
	 *  Runs no checks.
	 *  Here for future functionality.
	 */
	/* eslint-disable no-unused-vars */
	var appraisePostSubject = function appraisePostSubject(postSubject) {
	  return [];
	};
	/* eslint-enable no-unused-vars */
	
	exports.appraiseThese = appraiseThese;
	exports.appraiseEmail = appraiseEmail;
	exports.appraiseDisplayName = appraiseDisplayName;
	exports.appraisePassword = appraisePassword;
	exports.appraisePasswordExtra = appraisePasswordExtra;
	exports.appraisePasswordErrors = appraisePasswordErrors;
	exports.appraiseAccountId = appraiseAccountId;
	exports.appraisePostSubject = appraisePostSubject;
	exports.appraisePostMessage = appraisePostMessage;

/***/ },
/* 20 */
/***/ function(module, exports) {

	module.exports = require("validator");

/***/ },
/* 21 */
/***/ function(module, exports) {

	module.exports = require("owasp-password-strength-test");

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.authenticationRoutes = exports.ensureLoggedIn = undefined;
	
	__webpack_require__(23);
	
	var _ensureLoggedIn = __webpack_require__(25);
	
	var _ensureLoggedIn2 = _interopRequireDefault(_ensureLoggedIn);
	
	var _routes = __webpack_require__(26);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.ensureLoggedIn = _ensureLoggedIn2.default;
	exports.authenticationRoutes = _routes2.default;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _passportLocal = __webpack_require__(24);
	
	var _passport = __webpack_require__(6);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	var _model = __webpack_require__(11);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* Configure the local strategy for use by Passport.
	 *
	 * The local strategy require a `verify` function which receives the credentials
	 * (`username` and `password`) submitted by the user.  The function must verify
	 * that the password is correct and then invoke `callback` with a user object, which
	 * will be set at `req.user` in route handlers after authentication.
	 */
	_passport2.default.use(new _passportLocal.Strategy({
	  usernameField: 'email',
	  passwordField: 'password'
	}, function snsLocalStrategy(email, password, callback) {
	  var foundAccount = null;
	  _model2.default.findOneByEmail(email).then(function comparePass(theAccount) {
	    foundAccount = theAccount;
	    return theAccount.comparePassword(password);
	  }).then(function returnAccount(passwordsMatched) {
	    if (!passwordsMatched) {
	      throw new Error('Could not verify account');
	    }
	    return foundAccount;
	  }).then(function returnAccount(accountToReturn) {
	    callback(null, accountToReturn);
	  }).catch(function catchAuthFailure(err) {
	    console.log('Passport authentication failed: Unknown error: ' + err);
	    return callback(null, false, { message: 'Could not authenticate account' });
	  });
	}));
	
	/* Configure Passport authenticated session persistence.
	 *
	 * In order to restore authentication state across HTTP requests, Passport needs
	 * to serialize users into and deserialize users out of the session.  The
	 * typical implementation of this is as simple as supplying the user ID when
	 * serializing, and querying the user record by ID from the database when
	 * deserializing.
	 */
	_passport2.default.serializeUser(function serializeAccount(account, callback) {
	  console.log('Serializing user. This id: ', account.accountId);
	  callback(null, account.accountId);
	});
	
	_passport2.default.deserializeUser(function deserializeAccount(accountId, callback) {
	  console.log('Deserializing user based on ' + accountId);
	  _model2.default.findOneAccount(accountId).then(function determineAction(theAccount) {
	    return callback(null, theAccount);
	  }).catch(function noFind(err) {
	    return callback(err);
	  });
	});

/***/ },
/* 24 */
/***/ function(module, exports) {

	module.exports = require("passport-local");

/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ensureLoggedIn;
	/* Based on here: https://github.com/jaredhanson/connect-ensure-login/blob/master/lib/ensureLoggedIn.js
	 * Used under MIT license
	 * I edited it to make it go along with my linter and easier for me to understand.
	 * Original release notes:
	 * Ensure that a user is logged in before proceeding to next route middleware.
	 *
	 * This middleware ensures that a user is logged in.  If a request is received
	 * that is unauthenticated, the request will be redirected to a login page (by
	 * default to `/login`).
	 *
	 * Additionally, `returnTo` will be be set in the session to the URL of the
	 * current request.  After authentication, this value can be used to redirect
	 * the user to the page that was originally requested.
	 *
	 * Options:
	 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
	 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
	 *
	 * Examples:
	 *
	 *     app.get('/profile',
	 *       ensureLoggedIn(),
	 *       function(req, res) { ... });
	 *
	 *     app.get('/profile',
	 *       ensureLoggedIn('/signin'),
	 *       function(req, res) { ... });
	 *
	 *     app.get('/profile',
	 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
	 *       function(req, res) { ... });
	 *
	 * @param {Object} options
	 * @return {Function}
	 * @api public
	 */
	function ensureLoggedIn(options) {
	  var unauthenticatedRedirectURL = '/login';
	  if (typeof options === 'string') {
	    unauthenticatedRedirectURL = options;
	  } else if (options && options.redirectTo && options.redirectTo.length > 0) {
	    unauthenticatedRedirectURL = options.redirectTo;
	  }
	  var allOptions = options || {};
	
	  var setReturnTo = allOptions.setReturnTo === undefined ? true : options.setReturnTo;
	
	  return function areWeAuthenticated(req, res, next) {
	    // eslint-disable-line consistent-return
	    if (!req.isAuthenticated || !req.isAuthenticated()) {
	      if (setReturnTo && req.session) {
	        req.session.returnTo = req.originalUrl || req.url; // eslint-disable-line no-param-reassign
	      }
	      return res.redirect(unauthenticatedRedirectURL);
	    }
	    next();
	  };
	}

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _passport = __webpack_require__(6);
	
	var _passport2 = _interopRequireDefault(_passport);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var routes = new _express.Router();
	
	function signinUser(req, res, next) {
	  _passport2.default.authenticate('local', function (err, user) {
	    // eslint-disable-line consistent-return
	    if (err || !user) {
	      res.statusMessage = 'Could not log in with that email and password combination.'; // eslint-disable-line no-param-reassign
	      res.status(422).end();
	    }
	    req.logIn(user, function (error) {
	      // eslint-disable-line consistent-return
	      if (error) {
	        return next(error);
	      }
	      res.cookie('snssl', 'y', { httpOnly: false });
	
	      // you can send a json response instead of redirecting the user
	      res.status(201).json({
	        success: true,
	        message: 'Logged in',
	        account: user
	      });
	    });
	  })(req, res, next);
	}
	
	routes.route('/sessions').post(signinUser);
	
	routes.route('/sessions').delete(function logThemOut(req, res) {
	  req.session.destroy();
	  req.logout();
	  res.clearCookie('snssl');
	  res.status(204).end();
	});
	
	/* Checks if a user is currently authenticated.
	 * Technically, checks the cookie.
	 */
	routes.route('/sessions').get(function isAuthenticated(req, res) {
	  if (!req.isAuthenticated || !req.isAuthenticated()) {
	    res.status(204).end();
	  }
	  res.status(403).end();
	});
	
	exports.default = routes;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RecipientController = exports.Recipient = exports.recipientRoutes = undefined;
	
	var _routes = __webpack_require__(28);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _model = __webpack_require__(30);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _controller = __webpack_require__(29);
	
	var RecipientController = _interopRequireWildcard(_controller);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.recipientRoutes = _routes2.default;
	exports.Recipient = _model2.default;
	exports.RecipientController = RecipientController;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _controller = __webpack_require__(29);
	
	var _Authentication = __webpack_require__(22);
	
	var routes = new _express.Router();
	routes.get('/recipients', (0, _Authentication.ensureLoggedIn)(), _controller.getRecipientsEndpoint);
	routes.post('/recipients', (0, _Authentication.ensureLoggedIn)(), _controller.addRecipientEndpoint);
	routes.put('/recipients/:recipientId', (0, _Authentication.ensureLoggedIn)(), _controller.updateRecipientEndpoint);
	routes.delete('/recipients/:recipientId', (0, _Authentication.ensureLoggedIn)(), _controller.removeRecipientEndpoint);
	
	exports.default = routes;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removeRecipientEndpoint = exports.updateRecipientEndpoint = exports.addRecipientEndpoint = exports.getRecipientsEndpoint = undefined;
	
	var _model = __webpack_require__(30);
	
	/* Returns either the current account's accountId or, if onBehalfOfId is passed in
	 *  to the body, it will verify if the current account can act on behalf of the passed
	 *  in id and return that.
	 *  @param {object} req - the request object that has a user account attached
	 *  @returns {string} accountId - the accountId to use in searches.
	 */
	var activeAccountId = function getAccount(req) {
	  var currentAccount = req.user;
	  var onBehalfOfId = req.body.onBehalfOfId;
	  if (onBehalfOfId && onBehalfOfId.length > 0) {
	    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {
	      return onBehalfOfId;
	    }
	  }
	  return req.user.accountId;
	};
	
	/* Get all of the recipients for the accountId.
	 * Params needed in req.body:
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the search parameters.
	 */
	var getRecipientsEndpoint = function getRecipientsEndpoint(req, res) {
	  // eslint-disable-line consistent-return
	  var accountId = activeAccountId(req);
	  if (!accountId) {
	    return res.status(422).json({ success: false, message: 'No accountId provided' });
	  }
	  _model.Recipient.findAllForId(accountId, false).then(function (recipients) {
	    var cleanRecipients = recipients.map(function jsonify(recipient) {
	      return recipient.toJSON();
	    });
	    console.log('Found these recipients');
	    console.dir(recipients);
	    res.status(201).json({
	      success: true,
	      recipients: cleanRecipients
	    });
	  }).catch(function (err) {
	    res.status(422).json({ success: false, message: err.message });
	  });
	};
	
	/* Adds an recipient to the Recipients database based on the fields passed in.
	 * Params needed in req.body:
	 *   @param {string} email - the email address
	 *   @param {string} displayName - the displayName for the recipient.
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the accountId to search for.
	 */
	var addRecipientEndpoint = function addRecipientEndpoint(req, res) {
	  var _req$body = req.body,
	      email = _req$body.email,
	      displayName = _req$body.displayName;
	
	  var accountId = activeAccountId(req);
	  var newRecipient = new _model.Recipient({
	    email: email,
	    displayName: displayName,
	    ownerAccountId: accountId
	  });
	  console.log('Heres the new recipient');
	  console.dir(newRecipient);
	  newRecipient.save().then(function (createdRecipient) {
	    console.log('Created new recipient: ');
	    console.dir(createdRecipient);
	    console.dir(createdRecipient.toObject());
	    res.status(201).json({
	      success: true,
	      message: 'Successfully created recipient',
	      recipient: createdRecipient.toJSON()
	    });
	  }).catch(function (err) {
	    console.log('Recipient creation error: ');
	    console.dir(err);
	    var errorMessage = 'Recipient could not be created.';
	    if (err.code === 11000) {
	      errorMessage = 'Recipient already exists';
	    } else if (err.message) {
	      errorMessage = err.message;
	    }
	    res.status(422).json({ success: false, messages: errorMessage });
	  });
	};
	
	/* Updates a recipient
	 * Params needed in req.body:
	 *   @param {string=} email (optional) - the email address to update.
	 *   @param {string=} displayName (optional) - the displayName to update.
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param (number) recipientId - Will be pulled from req.params or req.body (body takes priority)
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the accountId to search for.
	 */
	var updateRecipientEndpoint = function updateRecipientEndpoint(req, res) {
	  var recipientId = req.params.recipientId;
	  if (req.body.recipientId) {
	    recipientId = req.body.recipientId;
	  }
	  var _req$body2 = req.body,
	      email = _req$body2.email,
	      displayName = _req$body2.displayName,
	      status = _req$body2.status;
	
	  if (!recipientId) {
	    res.status(422).json({ success: false, messages: 'No recipientId provided.' });
	  }
	
	  var accountId = activeAccountId(req);
	  var updates = {};
	  if (email && email.length > 0) updates.email = email;
	  if (displayName && displayName.length > 0) updates.displayName = displayName;
	  if (status && status.length > 0) updates.status = status;
	
	  if (Object.keys(updates).length === 0) {
	    res.status(422).json({ success: false, messages: 'Nothing to update.' });
	  }
	  _model.Recipient.update(recipientId, accountId, updates).then(function (updatedRecipient) {
	    console.log('Updated recipient: ');
	    console.dir(updatedRecipient);
	    console.dir(updatedRecipient.toObject());
	    res.status(201).json({
	      success: true,
	      message: 'Successfully updated recipient',
	      recipient: updatedRecipient.toJSON()
	    });
	  }).catch(function (err) {
	    console.log('Recipient update error: ');
	    console.dir(err);
	    var errorMessage = 'Recipient could not be updated.';
	    if (err.message) {
	      errorMessage = err.message;
	    }
	    res.status(422).json({ success: false, messages: errorMessage });
	  });
	};
	
	/* Removes a recipient (marks the status to 'removed')
	 * Params needed in req.body:
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param (number) recipientId - Will be pulled from req.params or req.body (body takes priority)
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the accountId to search for.
	 */
	var removeRecipientEndpoint = function removeRecipientEndpoint(req, res) {
	  var recipientId = req.params.recipientId;
	  if (req.body.recipientId) {
	    recipientId = req.body.recipientId;
	  }
	  if (!recipientId) {
	    res.status(422).json({ success: false, messages: 'No recipientId provided.' });
	  }
	
	  var accountId = activeAccountId(req);
	  _model.Recipient.update(recipientId, accountId, { status: _model.RecipientStatus.REMOVED }).then(function (updatedRecipient) {
	    console.log('Updated recipient: ');
	    console.dir(updatedRecipient);
	    console.dir(updatedRecipient.toObject());
	    res.status(201).json({
	      success: true,
	      message: 'Successfully removed recipient'
	    });
	  }).catch(function (err) {
	    console.log('Recipient removal error: ');
	    console.dir(err);
	    var errorMessage = 'Recipient could not be removed.';
	    if (err.message) {
	      errorMessage = err.message;
	    }
	    res.status(422).json({ success: false, messages: errorMessage });
	  });
	};
	
	exports.getRecipientsEndpoint = getRecipientsEndpoint;
	exports.addRecipientEndpoint = addRecipientEndpoint;
	exports.updateRecipientEndpoint = updateRecipientEndpoint;
	exports.removeRecipientEndpoint = removeRecipientEndpoint;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.RecipientStatus = exports.Recipient = undefined;
	
	var _mongoose = __webpack_require__(12);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _appraise = __webpack_require__(19);
	
	var _idier = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var RecipientStatus = {
	  VALIDATING: 'validating',
	  ACTIVE: 'active',
	  REMOVED: 'removed',
	  BOUNCING: 'bouncing',
	  UNSUBSCRIBED: 'unsubscribed'
	};
	
	/* Recipient schema represents all recipients for an account.
	 */
	var RecipientSchema = new _mongoose.Schema({
	  status: {
	    type: _mongoose.Schema.Types.String,
	    default: RecipientStatus.ACTIVE,
	    enum: [RecipientStatus.VALIDATING, RecipientStatus.ACTIVE, RecipientStatus.REMOVED, RecipientStatus.BOUNCING, RecipientStatus.UNSUBSCRIBED]
	  },
	  recipientId: {
	    type: _mongoose.Schema.Types.Number,
	    unique: true,
	    required: true
	  },
	  ownerAccountId: {
	    type: _mongoose.Schema.Types.Number,
	    required: true,
	    index: true
	  },
	  email: {
	    type: String,
	    trim: true
	  },
	  phoneNumber: {
	    type: String
	  },
	  phoneType: {
	    type: String
	  },
	  displayName: {
	    type: String,
	    trim: true
	  },
	  dateCreated: {
	    type: Date,
	    default: Date.now
	  },
	  dateUpdated: {
	    type: Date,
	    default: Date.now
	  },
	  dateRecipientValidated: {
	    type: Date
	  },
	  dateUnsubscribed: {
	    type: Date
	  },
	  unsubscriptionReason: {
	    type: String
	  },
	  dateRemoved: {
	    type: Date
	  }
	});
	
	/* If it's a new recipient, create an recipientId for it. */
	RecipientSchema.pre('validate', function preValidateRecipient(next) {
	  console.log('Called pre save recipient');
	  if (!this.recipientId) {
	    this.recipientId = (0, _idier.idier)();
	  }
	  next();
	});
	
	/* Update the dateUpdated field on save. */
	RecipientSchema.pre('save', true, function updateRecipientDate(next, done) {
	  this.dateUpdated = new Date();
	  next();
	  done();
	});
	
	/* Does the pre-save validations.
	 * Why here instead of on each individual field? Allows us to return multiple errors at once.
	 */
	RecipientSchema.pre('save', true, function preRecipientSaveValidations(next, done) {
	  var errorMessages = [];
	  var emailAppraisal = (0, _appraise.appraiseEmail)(this.email);
	  if (emailAppraisal.length > 0) {
	    this.invalidate('email', emailAppraisal.join(', '));
	    errorMessages.push(emailAppraisal.join(', '));
	  }
	
	  var displayNameAppraisal = (0, _appraise.appraiseDisplayName)(this.displayName);
	  if (displayNameAppraisal.length > 0) {
	    this.invalidate('displayName', displayNameAppraisal.join(', '));
	    errorMessages.push(displayNameAppraisal.join(' '));
	  }
	  if (errorMessages.length > 0) {
	    done(new Error(errorMessages.join(' ')));
	  }
	  next();
	  done();
	});
	
	/* Remove password and pepper from exported json && object
	 * Based on: http://ksloan.net/tips-for-using-mongoose-schemas-with-express-mongo-express-node-stack/
	 */
	RecipientSchema.set('toJSON', {
	  transform: function transformJSON(doc, objRepresentation) {
	    return {
	      recipientId: objRepresentation.recipientId,
	      email: objRepresentation.email,
	      displayName: objRepresentation.displayName,
	      dateCreated: objRepresentation.dateCreated,
	      dateUnsubscribed: objRepresentation.dateUnsubscribed,
	      status: objRepresentation.status
	    };
	  }
	});
	
	/* Find a recipient by an recipientId
	 * @param {number} recipientId - the recipient id
	 * @returns {promise} - a promise to find something
	 */
	RecipientSchema.statics.findOneRecipient = function findRecipientById(recipientId) {
	  return this.findOne({ recipientId: recipientId }).exec();
	};
	
	/* Find a recipient by an recipientId and update the appropriate fields.
	 * @param {number} recipientId - the recipient id
	 * @param {object} fieldsToUpdate - the fields and their values to update to.
	 * @returns {promise} - a promise to find something
	 * @note: We do it this way instead of findOneAndUpdate because update and valdiation hooks are
	 *   not called on findOneAndUpdate.
	 */
	RecipientSchema.statics.update = function findARecipientById(recipientId, ownerId, fieldsToUpdate) {
	  return this.findOne({ recipientId: recipientId, ownerAccountId: ownerId }).exec().then(function (foundItem) {
	    var foundRecipient = foundItem;
	    var fieldsToUpdateKeys = Object.keys(fieldsToUpdate);
	    fieldsToUpdateKeys.forEach(function modifyItem(key) {
	      foundRecipient[key] = fieldsToUpdate[key];
	    });
	    return foundRecipient.save();
	  });
	};
	
	/* Find a recipient by an email address
	 * @param {string} email - the associated email address
	 * @returns {promise} - a promise to find something
	 */
	RecipientSchema.statics.findOneByEmail = function findRecipientByEmail(email) {
	  return this.findOne({ email: email }).exec();
	};
	
	/* Find all recipients for an accountId
	 * @param {string} accountId - the accountId to search for
	 * @returns {promise} - a promise to find something
	 */
	RecipientSchema.statics.findAllForId = function findRecipients(accountId) {
	  var lean = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
	
	  if (lean) {
	    return this.find({ ownerAccountId: accountId }).lean().exec();
	  }
	  return this.find({ ownerAccountId: accountId }).exec();
	};
	
	/* Determine total number of recipients for account
	 * @param {number} - accountId
	 */
	RecipientSchema.statics.totalForAccountId = function countRecipients(accountId) {
	  return this.count({ ownerAccountId: accountId }).exec();
	};
	
	/* Compile the schema into a model
	 * http://mongoosejs.com/docs/models.html
	 */
	var Recipient = _mongoose2.default.model('Recipient', RecipientSchema);
	
	exports.Recipient = Recipient;
	exports.RecipientStatus = RecipientStatus;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostController = exports.Post = exports.postRoutes = undefined;
	
	var _routes = __webpack_require__(32);
	
	var _routes2 = _interopRequireDefault(_routes);
	
	var _model = __webpack_require__(34);
	
	var _model2 = _interopRequireDefault(_model);
	
	var _controller = __webpack_require__(33);
	
	var PostController = _interopRequireWildcard(_controller);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.postRoutes = _routes2.default;
	exports.Post = _model2.default;
	exports.PostController = PostController;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _express = __webpack_require__(3);
	
	var _controller = __webpack_require__(33);
	
	var _Authentication = __webpack_require__(22);
	
	var routes = new _express.Router();
	routes.get('/posts', (0, _Authentication.ensureLoggedIn)(), _controller.getPostsEndpoint);
	routes.post('/posts', (0, _Authentication.ensureLoggedIn)(), _controller.addPostEndpoint);
	routes.put('/posts/:postId', (0, _Authentication.ensureLoggedIn)(), _controller.updatePostEndpoint);
	routes.delete('/posts/:postId', (0, _Authentication.ensureLoggedIn)(), _controller.removePostEndpoint);
	
	exports.default = routes;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.removePostEndpoint = exports.updatePostEndpoint = exports.addPostEndpoint = exports.getPostsEndpoint = undefined;
	
	var _model = __webpack_require__(34);
	
	/* Returns either the current account's accountId or, if onBehalfOfId is passed in
	 *  to the body, it will verify if the current account can act on behalf of the passed
	 *  in id and return that.
	 *  @param {object} req - the request object that has a user account attached
	 *  @returns {string} accountId - the accountId to use in searches.
	 *   TODO: need to move it to it's own module since we're duplicating it in every controller.
	 */
	var activeAccountId = function getAccount(req) {
	  var currentAccount = req.user;
	  var onBehalfOfId = req.body.onBehalfOfId;
	  if (onBehalfOfId && onBehalfOfId.length > 0) {
	    if (currentAccount && currentAccount.canActOnBehalfOf(onBehalfOfId)) {
	      return onBehalfOfId;
	    }
	  }
	  if (req.user && req.user.accountId) {
	    return req.user.accountId;
	  }
	  return null;
	};
	
	/* Get all of the posts for the accountId.
	 * Params needed in req.body:
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the search parameters.
	 */
	var getPostsEndpoint = function getPostsEndpoint(req, res) {
	  // eslint-disable-line consistent-return
	  var accountId = activeAccountId(req);
	  if (!accountId) {
	    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  }
	  _model.Post.findAllForId(accountId, false).then(function (items) {
	    var cleanedItems = items.map(function jsonify(mappedItem) {
	      return mappedItem.toJSON();
	    });
	    console.log('Found these:');
	    console.dir(cleanedItems);
	    res.status(200).json({
	      success: true,
	      posts: cleanedItems
	    });
	  }).catch(function (err) {
	    res.statusMessage = err.message; // eslint-disable-line no-param-reassign
	    res.status(404).end();
	  });
	};
	
	/* Adds a post to the Post database based on the fields passed in.
	 * Params needed in req.body:
	 *   @param {string} message - the main message body
	 *   @param {string=} subject (optional) - subject of the post.
	 *   @param {array[number]} mediaIds - the mediaIds associated with this post.
	 *   @param {string=} status (optional) - Must be one of PostStatus (see Post model).
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the accountId to search for.
	 */
	var addPostEndpoint = function addPostEndpoint(req, res) {
	  var accountId = activeAccountId(req);
	  if (!accountId) {
	    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  }
	  var _req$body = req.body,
	      message = _req$body.message,
	      subject = _req$body.subject,
	      mediaIds = _req$body.mediaIds,
	      status = _req$body.status;
	
	  var newItem = new _model.Post({
	    message: message,
	    subject: subject,
	    mediaIds: mediaIds,
	    status: status,
	    ownerAccountId: accountId
	  });
	  newItem.save().then(function (createdItem) {
	    console.log('Created new: ');
	    console.dir(createdItem);
	    console.dir(createdItem.toObject());
	    var cleanedPost = createdItem.toJSON();
	    res.status(201).json({
	      success: true,
	      message: 'Successfully created post',
	      recipient: cleanedPost
	    });
	  }).catch(function (err) {
	    console.log('Post creation error: ');
	    console.dir(err);
	    var errorMessage = 'Post could not be created.';
	    if (err.code === 11000) {
	      errorMessage = 'Post already exists';
	    } else if (err.message) {
	      errorMessage = err.message;
	    }
	    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  });
	};
	
	/* Updates a post
	 *   @param {string} message - the main message body
	 *   @param {string=} subject (optional) - subject of the post.
	 *   @param {array[number]} mediaIds - the mediaIds associated with this post.
	 *   @param {string=} status (optional) - Must be one of PostStatus (see Post model).
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the accountId to search for.
	 */
	var updatePostEndpoint = function updatePostEndpoint(req, res) {
	  var accountId = activeAccountId(req);
	  if (!accountId) {
	    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  }
	  var itemId = req.params.postId;
	  if (req.body.postId) {
	    itemId = req.body.postId;
	  }
	  if (!itemId) {
	    res.status(422).json({ success: false, messages: 'No PostId provided.' });
	  }
	  var _req$body2 = req.body,
	      message = _req$body2.message,
	      subject = _req$body2.subject,
	      mediaIds = _req$body2.mediaIds,
	      status = _req$body2.status;
	
	  var updates = {};
	  if (message && message.length > 0) updates.message = message;
	  if (subject && subject.length > 0) updates.subject = subject;
	  if (mediaIds && mediaIds.length > 0) updates.mediaIds = mediaIds;
	  if (status && status.length > 0) updates.status = status;
	
	  if (Object.keys(updates).length === 0) {
	    res.status(422).json({ success: false, messages: 'Nothing to update.' });
	  }
	  _model.Post.update(itemId, accountId, updates).then(function (updatedItem) {
	    console.log('Updated: ');
	    console.dir(updatedItem.toObject());
	    res.status(200).json({
	      success: true,
	      message: 'Successfully updated post',
	      post: updatedItem.toJSON()
	    });
	  }).catch(function (err) {
	    console.log('Post update error: ');
	    console.dir(err);
	    var errorMessage = 'Post could not be updated.';
	    if (err.message) {
	      errorMessage = err.message;
	    }
	    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  });
	};
	
	/* Removes a post (marks the status to 'removed')
	 * Params needed in req.body:
	 *   @param (number=} onBehalfOfId - (optional) The accountId to act on behalf of if current account
	 *      can act on behalf of it.
	 *  @param (number) postId - Will be pulled from req.params or req.body (body takes priority)
	 *  @param {number} accountId - Will be pulled from req.user.
	 *  Uses activeAccountId() to get the accountId to search for.
	 */
	var removePostEndpoint = function removePostEndpoint(req, res) {
	  var accountId = activeAccountId(req);
	  if (!accountId) {
	    res.statusMessage = 'No accountId provided'; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  }
	  var itemId = req.params.postId;
	  if (req.body.postId) {
	    itemId = req.body.postId;
	  }
	  if (!itemId) {
	    res.statusMessage = 'No postId provided.'; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  }
	  _model.Post.update(itemId, accountId, { status: _model.PostStatus.REMOVED }).then(function (updateItem) {
	    console.log('Updated : ');
	    console.dir(updateItem);
	    console.dir(updateItem.toObject());
	    res.status(200).json({
	      success: true,
	      message: 'Successfully removed post'
	    });
	  }).catch(function (err) {
	    console.log('Post removal error: ');
	    console.dir(err);
	    var errorMessage = 'Post could not be removed.';
	    if (err.message) {
	      errorMessage = err.message;
	    }
	    res.statusMessage = errorMessage; // eslint-disable-line no-param-reassign
	    res.status(422).end();
	  });
	};
	
	exports.getPostsEndpoint = getPostsEndpoint;
	exports.addPostEndpoint = addPostEndpoint;
	exports.updatePostEndpoint = updatePostEndpoint;
	exports.removePostEndpoint = removePostEndpoint;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.PostStatus = exports.Post = undefined;
	
	var _mongoose = __webpack_require__(12);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	var _idier = __webpack_require__(16);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	/* The maximum we can return from a search */
	var MAX_RETURN_LIMIT = 100;
	
	/* Enum for the post.status field */
	var PostStatus = {
	  DRAFT: 'draft',
	  POSTED: 'posted',
	  REMOVED: 'removed'
	};
	
	/* Post schema represents all posts.
	 * https://developers.facebook.com/docs/graph-api/reference/v2.8/post
	 */
	var PostSchema = new _mongoose.Schema({
	  status: {
	    type: _mongoose.Schema.Types.String,
	    default: PostStatus.POSTED,
	    enum: [PostStatus.DRAFT, PostStatus.POSTED, PostStatus.REMOVED]
	  },
	  postId: {
	    type: _mongoose.Schema.Types.Number,
	    unique: true,
	    required: true
	  },
	  message: {
	    type: _mongoose.Schema.Types.String,
	    required: true
	  },
	  subject: {
	    type: _mongoose.Schema.Types.String
	  },
	  mediaIds: {
	    type: _mongoose.Schema.Types.Array
	  },
	  ownerAccountId: {
	    type: _mongoose.Schema.Types.Number,
	    required: true,
	    index: true
	  },
	  dateCreated: {
	    type: Date,
	    default: Date.now
	  },
	  dateUpdated: {
	    type: Date,
	    default: Date.now
	  }
	});
	
	/* If it's a new post, create an postId for it. */
	PostSchema.pre('validate', function preValidatePost(next) {
	  if (!this.postId) {
	    this.postId = (0, _idier.idier)();
	  }
	  next();
	});
	
	/* Update the dateUpdated field on save. */
	PostSchema.pre('save', true, function updatePostDate(next, done) {
	  this.dateUpdated = new Date();
	  next();
	  done();
	});
	
	/*
	 * Based on: http://ksloan.net/tips-for-using-mongoose-schemas-with-express-mongo-express-node-stack/
	 */
	PostSchema.set('toJSON', {
	  transform: function transformJSON(doc, objRepresentation) {
	    return {
	      postId: objRepresentation.postId,
	      message: objRepresentation.message,
	      subject: objRepresentation.subject,
	      mediaIds: objRepresentation.mediaIds,
	      ownerAccountId: objRepresentation.ownerAccountId,
	      dateCreated: objRepresentation.dateCreated,
	      dateUpdated: objRepresentation.dateUpdated,
	      status: objRepresentation.status
	    };
	  }
	});
	
	/* Find a post by an postId
	 * @param {number} postId - the post identifier
	 * @returns {promise} - a promise to find something
	 */
	PostSchema.statics.findOnePost = function findPostById(postId) {
	  return this.findOne({ postId: postId }).exec();
	};
	
	/* Find a post by an postId and update the appropriate fields.
	 * @param {number} recipientId - the recipient id
	 * @param {number} ownerId - the owner id
	 * @param {object} fieldsToUpdate - the fields and their values to update to.
	 * @returns {promise} - a promise to find and update something
	 * @note: We do it this way instead of findOneAndUpdate because update and valdiation hooks are
	 *   not called on findOneAndUpdate.
	 */
	PostSchema.statics.update = function updatePostById(postId, ownerId, fieldsToUpdate) {
	  return this.findOne({ postId: postId, ownerAccountId: ownerId }).exec().then(function (foundItem) {
	    var foundPost = foundItem;
	    var fieldsToUpdateKeys = Object.keys(fieldsToUpdate);
	    fieldsToUpdateKeys.forEach(function modifyItem(key) {
	      foundPost[key] = fieldsToUpdate[key];
	    });
	    return foundPost.save();
	  });
	};
	
	/* Find all posts for an accountId
	 * @param {string} accountId - the accountId to search for
	 * @param {number} limit - the number to find.
	 * @param {number} beforeId - the identifier to sort before. If this is passed, limit is used.
	 * @returns {promise} - a promise to find something
	 */
	PostSchema.statics.findAllForId = function allPosts(accountId) {
	  var limit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 20;
	  var beforeId = arguments[2];
	
	  var limiter = limit;
	  if (limiter > MAX_RETURN_LIMIT) limiter = MAX_RETURN_LIMIT;
	
	  if (beforeId) {
	    return this.find({ ownerAccountId: accountId, postId: { $lte: beforeId } }).limit(limiter).sort({ postId: -1 }).exec();
	  }
	  return this.find({ ownerAccountId: accountId }).limit(limiter).sort({ postId: -1 }).exec();
	};
	
	/* Determine total number of posts for account
	 * @param {number} - accountId
	 */
	PostSchema.statics.totalForAccountId = function countPosts(accountId) {
	  return this.count({ ownerAccountId: accountId }).exec();
	};
	
	/* Compile the schema into a model
	 * http://mongoosejs.com/docs/models.html
	 */
	var Post = _mongoose2.default.model('Post', PostSchema);
	
	exports.Post = Post;
	exports.PostStatus = PostStatus;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _dotenv = __webpack_require__(36);
	
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
/* 36 */
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _mongoose = __webpack_require__(12);
	
	var _mongoose2 = _interopRequireDefault(_mongoose);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var MONGODB_URI = process.env.MONGODB_URI;
	
	var options = {
	  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
	  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
	};
	
	_mongoose2.default.Promise = global.Promise;
	
	/* Connect to mongo */
	_mongoose2.default.connect(MONGODB_URI, options);
	_mongoose2.default.connection.once('open', function () {
	  return console.log('Connected to MongoDb: running on ' + MONGODB_URI);
	}).on('error', function (err) {
	  return console.warn('Warning', err);
	});
	
	exports.default = _mongoose2.default;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _redis = __webpack_require__(39);
	
	var _redis2 = _interopRequireDefault(_redis);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var REDIS_URL = process.env.REDIS_URL;
	
	/* Connect to redis */
	var redisClient = _redis2.default.createClient(REDIS_URL);
	
	redisClient.on('error', function redisErrorReport(err) {
	  console.log('Redis connection error ' + err);
	});
	
	exports.default = redisClient;

/***/ },
/* 39 */
/***/ function(module, exports) {

	module.exports = require("redis");

/***/ },
/* 40 */
/***/ function(module, exports) {

	module.exports = require("connect-redis");

/***/ }
/******/ ]);
//# sourceMappingURL=server.js.map