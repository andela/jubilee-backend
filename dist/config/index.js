"use strict";

var _dotenv = _interopRequireDefault(require("dotenv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv.default.config();

module.exports = {
  secret: process.env.NODE_ENV === 'production' ? process.env.SECRET : 'secret'
};