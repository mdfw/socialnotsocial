/* Base imports */
import { Server } from 'http';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import { validateUserSession } from './modules/Authentication/warrant';

/* Routes */
// import { userRoutes, recipientRoutes, authenticationRoutes, postRoutes } from './modules';
import { userRoutes, authenticationRoutes, postRoutes } from './modules';

/* Configurations */
import '../config/environment';
import redisClient from '../config/redisConnect';

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
  name: 'snss',
  secret: 'MmyWTLNNsTi15LYHz8FP',
  resave: true,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient }),
}));
app.use(validateUserSession);
app.use(morgan('combined'));

/* Routes */
// app.use('/api/v1', [userRoutes, recipientRoutes, authenticationRoutes, postRoutes]);
app.use('/api/v1', [userRoutes, authenticationRoutes, postRoutes]);

app.get('/', function baseReturn(req, res) {
  res.send('Hello - this is the api server. You probably want a more interesting endpoint.');
});

process.on('SIGTERM', () => {
  console.log('Closing server.');
  app.close();
});

app.on('close', () => {
  console.log('Closing redis.');
  redisClient.quit();
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

