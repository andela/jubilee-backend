"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("@babel/polyfill");

var _express = _interopRequireDefault(require("express"));

var _passport = _interopRequireDefault(require("passport"));

var _cors = _interopRequireDefault(require("cors"));

var _errorhandler = _interopRequireDefault(require("errorhandler"));

var _morgan = _interopRequireDefault(require("morgan"));

var _methodOverride = _interopRequireDefault(require("method-override"));

var _cookieParser = _interopRequireDefault(require("cookie-parser"));

var _envConfig = _interopRequireDefault(require("./config/env-config"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const isProduction = _envConfig.default.NODE_ENV === 'production'; // Create global app object

const app = (0, _express.default)();
app.use((0, _cors.default)());
app.use((0, _cookieParser.default)()); // Normal express config defaults

app.use((0, _morgan.default)('dev'));
app.use(_express.default.urlencoded({
  extended: false
}));
app.use(_express.default.json());
app.use(_passport.default.initialize());
app.use((0, _methodOverride.default)());

if (!isProduction) {
  app.use((0, _errorhandler.default)());
} // connect app to routes


(0, _routes.default)(app); // / catch 404 and forward to error handler

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
}); // / error handlers
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
} // production error handler
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
}); // routes

app.use(_routes.default);
app.get('/', (req, res) => res.status(200).send({
  message: 'welcome to BN: jubilee-team'
}));
app.all('*', (req, res) => res.send({
  message: 'route not found'
})); // finally, let's start our server...

const server = app.listen(process.env.PORT || 3000, () => {
  // eslint-disable-next-line no-console
  console.log(`Listening on port ${server.address().port}`);
});
var _default = app;
exports.default = _default;