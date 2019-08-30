"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _services = require("../services");

var _utils = require("../utils");

const {
  successResponse,
  errorResponse,
  generateToken,
  extractUserData
} = _utils.Helpers;
const {
  findAny,
  updateAny
} = _services.UserService;
/**
 * A collection of methods that controls user's interaction via the User routes
 *
 * @class UserController
 */

class UserController {
  /**
   * Gets a user profile after registeration or sign-in.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's profile details.
   * @memberof UserController
   */
  static async userProfile(req, res) {
    try {
      const id = req.params.userId;
      const user = await findAny({
        id
      });
      user.token = generateToken({
        email: user.email,
        id: user.id,
        role: user.role
      });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, {
        code: error.statusCode,
        message: error.message
      });
    }
  }
  /**
   * Updates a user profile.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */


  static async updateProfile(req, res) {
    try {
      const id = req.params.userId;
      const user = await updateAny(req.body, {
        id
      });
      user.token = generateToken({
        email: user.email,
        id: user.id,
        role: user.role
      });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, {
        code: error.statusCode,
        message: error.message
      });
    }
  }

}

var _default = UserController;
exports.default = _default;