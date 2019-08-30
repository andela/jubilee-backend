"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../../../swagger.json"));

var _users = _interopRequireDefault(require("./users"));

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = (0, _express.Router)();
router.use('/auth', _auth.default);
router.use('/users', _users.default);
router.use('/docs', _swaggerUiExpress.default.serve);
router.get('/docs', _swaggerUiExpress.default.setup(_swagger.default));
var _default = router;
exports.default = _default;