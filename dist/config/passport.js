"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dotenv = _interopRequireDefault(require("dotenv"));

var _passport = _interopRequireDefault(require("passport"));

var _passportFacebook = _interopRequireDefault(require("passport-facebook"));

var _passportGoogleOauth = require("passport-google-oauth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK
} = process.env;

_passport.default.use(new _passportGoogleOauth.OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK,
  profileFields: ['name', 'photos', 'email']
}, (accessToken, refreshToken, profile, done) => done(null, profile)));

_passport.default.use(new _passportFacebook.default({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: FACEBOOK_CALLBACK,
  profileFields: ['name', 'photos', 'emails']
}, (accessToken, refreshTocken, profile, done) => done(null, profile)));

_passport.default.serializeUser((user, done) => done(null, user));

_passport.default.deserializeUser((user, done) => done(null, user));

var _default = _passport.default;
exports.default = _default;