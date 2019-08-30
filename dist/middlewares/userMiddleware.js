"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../validation/index"));

var _utils = require("../utils");

var _index2 = require("../services/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  verifyToken,
  errorResponse,
  checkToken
} = _utils.Helpers;
/**
 * Middleware for input validations
 */

class ValidationMiddleware {
  /**
       * Middleware method for user validation during signup/registration
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - the returned values going into the next operation.
       * @returns {object} - returns an object (error or response).
       */
  static async onSignup(req, res, next) {
    try {
      const validated = await _index.default.signup(req.body);

      if (validated) {
        const user = await _index2.UserService.find(req.body.email);

        if (!user) {
          next();
        } else {
          errorResponse(res, {
            code: 409,
            message: `User with email: "${req.body.email}" already exists`
          });
        }
      }
    } catch (error) {
      errorResponse(res, {
        code: 400,
        message: error.details[0].context.label
      });
    }
  }
  /**
    * Middleware method for user authentication
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - the returned values going into the next operation.
    * @returns {object} - next().
    */


  static isAuthenticated(req, res, next) {
    try {
      const {
        userId
      } = req.params;
      const token = checkToken(req);
      const {
        id
      } = verifyToken(token);

      if (Number(userId) === id) {
        next();
      } else {
        throw new _utils.ApiError(401, 'Access denied, check your inputed details');
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, {
        code: status,
        message: err.message
      });
    }
  }

}

exports.default = ValidationMiddleware;