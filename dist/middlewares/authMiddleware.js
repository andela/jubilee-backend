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
  errorResponse
} = _utils.Helpers;
/**
 * Middleware for input validations
 */

class authMiddleware {
  /**
       * Middleware method for user validation during signup/registration
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
       */
  static async onUserSignup(req, res, next) {
    try {
      const validated = await _index.default.userSignup(req.body);
      const {
        email
      } = req.body;

      if (validated) {
        const user = await _index2.UserService.find({
          email
        });

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
     * Middleware method for supplier validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - Call the next operation.
     * @returns {object} - Returns an object (error or response).
     */


  static async onSupplierSignup(req, res, next) {
    try {
      const validated = await _index.default.supplierSignup(req.body);
      const {
        email
      } = req.body;

      if (validated) {
        const supplier = await _index2.UserService.find({
          email
        });

        if (!supplier) {
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

}

exports.default = authMiddleware;