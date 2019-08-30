"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _passport = _interopRequireDefault(require("../../config/passport"));

var _controllers = require("../../controllers");

var _features = require("../../test/features");

var _middlewares = require("../../middlewares");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
const {
  userSignup,
  supplierSignup,
  verifyEmail,
  sendResetPasswordEmail,
  resetPassword,
  verifyPasswordResetLink,
  loginUser,
  socialLogin,
  logout
} = _controllers.Auth;
const {
  checkParameters
} = _middlewares.PasswordMiddleware;
router.post('/signup/user', _middlewares.AuthMiddleware.onUserSignup, userSignup);
router.post('/signup/supplier', _middlewares.AuthMiddleware.onSupplierSignup, supplierSignup);
router.get('/verify', verifyEmail);
router.post('/login', loginUser);
router.post('/reset-password/', checkParameters, sendResetPasswordEmail);
router.get('/reset-password', verifyPasswordResetLink);
router.post('/password/reset/:email', checkParameters, resetPassword);
router.get('/logout', logout);
router.get('/facebook', _passport.default.authenticate('facebook', {
  scope: ['email']
}));
router.get('/facebook/callback', _passport.default.authenticate('facebook'), socialLogin);
router.get('/google', _passport.default.authenticate('google', {
  scope: ['email']
}));
router.get('/google/callback', _passport.default.authenticate('google'), socialLogin);
router.get('/rightSocial', _features.rightEmail, socialLogin);
router.get('/wrongSocial', _features.wrongEmail, socialLogin);
var _default = router;
exports.default = _default;