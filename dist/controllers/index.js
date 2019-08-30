"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function () {
    return _UserController.default;
  }
});
Object.defineProperty(exports, "Auth", {
  enumerable: true,
  get: function () {
    return _AuthController.default;
  }
});

var _UserController = _interopRequireDefault(require("./UserController"));

var _AuthController = _interopRequireDefault(require("./AuthController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }