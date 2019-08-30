"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _controllers = require("../../controllers");

var _middlewares = require("../../middlewares");

const router = (0, _express.Router)();
const {
  userProfile,
  updateProfile
} = _controllers.User;
const {
  isAuthenticated
} = _middlewares.UserMiddleware;
router.get('/profile/:userId', isAuthenticated, userProfile);
router.get('/profile/:userId/edit', isAuthenticated, userProfile);
router.put('/profile/:userId/update', isAuthenticated, updateProfile);
var _default = router;
exports.default = _default;