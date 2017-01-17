/* Configurations */
import { Server } from 'http';
import { accountRoutes, recipientRoutes } from './modules';
import { Strategy } from 'passport-local';
import '../config/environment';
import '../config/mongoConnect';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import morgan from 'morgan';
import passport from 'passport';
import redisClient from '../config/redisConnect';

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
  store: redisClient,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

/* Routes */
app.use('/api/v1', [accountRoutes, recipientRoutes]);

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

