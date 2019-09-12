import { UserService } from '../services';
import { Helpers } from '../utils';

const {
  successResponse, errorResponse, extractUserData
} = Helpers;

const { find, updateAny, updateById } = UserService;

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
  static async getProfile(req, res) {
    try {
      const id = req.params.userId;
      const user = await find({ id });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.statusCode, message: error.message });
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
      const user = await updateAny(req.body, { id });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.statusCode, message: error.message });
    }
  }

  /**
   * Toggle email notification (ON/OFF) when a staff creates a new travel for the direct manager.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async toggleEmailNotification(req, res) {
    try {
      const id = req.params.userId;
      const user = await updateById(req.body, { id });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.statusCode, message: error.message });
    }
  }
}

export default UserController;
