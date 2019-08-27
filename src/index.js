import express from 'express';
import morgan from 'morgan';
import routes from './routes';


const isProduction = process.env.NODE_ENV === 'production';

const app = express();
const port = process.env.PORT || 3000;


app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// routes
app.use(routes);
app.get('/', (req, res) => res.status(200).send({ message: 'welcome to BN: jubilee-team' }));
app.all('*', (req, res) => res.send({ message: 'route not found' }));

// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use((err, req, res, next) => {
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
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    errors: {
      message: err.message,
      error: {}
    }
  });
});

// finally, let's start our server...
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});

export default server;
