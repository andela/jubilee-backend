"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _passwordValidator = require("../validation/passwordValidator");

var _utils = require("../utils");

const {
  validate,
  errorResponse
} = _utils.Helpers;
/**
 * Collection of methods for PasswordMiddleware
 * @class PasswordMiddleware
 */

class PasswordMiddleware {
  /**
     * Middleware for password reset form
     *
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {Next} next
     * @returns {next} - Continue with the request.
     * @memberof PasswordMiddleware
     */
  static checkParameters(req, res, next) {
    try {
      const result = validate(req.body, req.body.email ? _passwordValidator.passwordResetEmailSchema : _passwordValidator.changePasswordSchema);

      if (result.error !== null) {
        const {
          message
        } = result.error.details[0];
        return errorResponse(res, {
          code: 400,
          message
        });
      }

      next();
    } catch (err) {
      errorResponse(res, {
        code: 500,
        message: err.message
      });
    }
  }

}

var _default = PasswordMiddleware;
exports.default = _default;