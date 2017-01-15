/* Configurations */
import '../config/environment';
import '../config/mongoConnect';
import redisClient from '../config/redisConnect';
import express from 'express';
import { Server } from 'http';
import bodyParser from 'body-parser';
import passport from 'passport';
//import { Strategy } from 'passport-local';
import { accountRoutes } from './modules';
import morgan from 'morgan';
import { idier } from '../shared/helpers/idier';

const port = process.env.API_SERVER_PORT;

const app = express();

/* Middleware setup */
app.use((err, req, res, next) => {
  if (res.headersSent) next(err);
  res.status(err.status || port).render('500');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('express-session')({
  name: 'sessionId',
  secret: 'MmyWTLNNsTi15LYHz8FP',
  resave: true,
  saveUninitialized: false,
  store: redisClient,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(morgan('combined'));

console.dir(accountRoutes);

/* Routes */
app.use('/api/v1', [accountRoutes]);

app.get('/boo', function booReturn(req, res) {
  res.send('boo!');
});

app.get('/idier', function basReturn(req, res) {
  const newId = idier();
  res.send(`${newId}`);
});

app.get('/', function baseReturn(req, res) {
  res.send('Hello World!');
});

/* Start the API Server */
const server = Server(app);
server.listen(port, err => {
  if (err) console.log(`API Server error on startup: ${err}`);
  console.log(`API Server listening on http://localhost:${port}.`);
});
