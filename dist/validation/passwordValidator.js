"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePasswordSchema = exports.passwordResetEmailSchema = void 0;

var _joi = _interopRequireDefault(require("@hapi/joi"));

var _joiPasswordComplexity = _interopRequireDefault(require("joi-password-complexity"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const passwordResetEmailSchema = _joi.default.object().keys({
  email: _joi.default.string().email().required()
});

exports.passwordResetEmailSchema = passwordResetEmailSchema;
const complexityOPtions = {
  min: 8,
  max: 250,
  lowerCase: 1,
  upperCase: 1,
  numeric: 1,
  symbol: 1,
  requirementCount: 3
};

const changePasswordSchema = _joi.default.object().keys({
  password: new _joiPasswordComplexity.default(complexityOPtions).required(),
  confirmPassword: _joi.default.string().valid(_joi.default.ref('password')).required().options({
    language: {
      any: {
        allowOnly: 'do not match with password!'
      }
    }
  })
});

exports.changePasswordSchema = changePasswordSchema;