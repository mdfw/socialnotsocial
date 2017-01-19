/* Configurations */
import { Server } from 'http';
import { accountRoutes, recipientRoutes, authenticationRoutes } from './modules';
import { ensureLoggedIn } from './modules/Authentication';
import '../config/environment';
import '../config/mongoConnect';
import bodyParser from 'body-parser'; // eslint-disable-line
import express from 'express'; // eslint-disable-line
import session from 'express-session'; // eslint-disable-line
import morgan from 'morgan'; // eslint-disable-line
import passport from 'passport'; // eslint-disable-line
import redisClient from '../config/redisConnect'; // eslint-disable-line

const RedisStore = require('connect-redis')(session);

let port = process.env.API_SERVER_PORT;
if (!port) {
  port = 3006;
}

const app = express();

/* Middleware setup */
app.use((err, req, res, next) => {
  if (res.headersSent) next(err);
  res.status(err.status || port).render('500');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  name: 'sessionId',
  secret: 'MmyWTLNNsTi15LYHz8FP',
  resave: true,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

/* Routes */
app.use('/api/v1', [accountRoutes, recipientRoutes, authenticationRoutes]);

app.get('/supersecure', ensureLoggedIn(), function secureReturn(req, res) {
  res.send('Hellow - this is secure.');
});

app.get('/', function baseReturn(req, res) {
  res.send('Hello - this is the api server. You probably want a more interesting endpoint.');
});

/* Start the API Server */
const server = Server(app);
server.listen(port, function reportOnListen(error) {
  if (error) {
    console.log(`API Server ERROR on startup: ${error}`);
  } else {
    console.log(`API Server listening on http://localhost:${port}.`);
  }
});

