import '@babel/polyfill';
import express from 'express';
import passport from 'passport';
import cors from 'cors';
import errorhandler from 'errorhandler';
import morgan from 'morgan';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import { createNamespace } from 'cls-hooked';
import env from './config/env-config';
import routes from './routes';
import db from './models';
import socketIO from './utils/socketIO';
// Create CLS namespace
const dbNameSpace = createNamespace('db');
db.Sequelize.useCLS(dbNameSpace);


const isProduction = env.NODE_ENV === 'production';

// Create global app object
const app = express();

app.use(cors());
app.use(cookieParser());

// Normal express config defaults
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());

app.use(methodOverride());

if (!isProduction) {
  app.use(errorhandler());
}

// connect app to routes
app.use('/api', routes);

// / catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// / error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  // eslint-disable-next-line no-unused-vars
  app.use((err, req, res, next) => {
    // eslint-disable-next-line no-console
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({
      errors: {
        message: err.message,
        error: err
      }
    });
  });
}

// production error handler
// no stacktraces leaked to user
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});
// routes
app.use(routes);
app.get('/', (req, res) => res.status(200).send({ message: 'welcome to BN: jubilee-team' }));
app.all('*', (req, res) => res.send({ message: 'route not found' }));

// finally, let's start our server...
const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});

socketIO.initialize(server);

export default app;
