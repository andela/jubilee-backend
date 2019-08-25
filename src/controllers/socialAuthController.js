import { socialAuthService } from '../services';
import { Helpers, UserResponse } from '../utils';

/**
 * @class SocialAuthController
 *@description  Controller class to return response body
 */


export default class SocialAuthController {
  /**
   * create with facebook data
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof SocialAuthController
   * @returns {object} - response body
   *
   */
  static async facebookAuth(req, res) {
    try {
      const data = await socialAuthService.facebookCreate(req.user);
      const userResponse = new UserResponse(data);
      Helpers.successResponse(res, userResponse, 200);
    } catch (error) {
      Helpers.errorResponse(res, { code: error.statusCode, message: error.message });
    }
  }

  /**
   * create with facebook data
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof SocialAuthController
   * @returns {object} - response body
   *
   */
  static async googleAuth(req, res) {
    try {
      const data = await socialAuthService.googleCreate(req.user);
      const userResponse = new UserResponse(data);
      Helpers.successResponse(res, userResponse, 200);
    } catch (error) {
      Helpers.errorResponse(res, { code: error.statusCode, message: error.message });
    }
  }
}
