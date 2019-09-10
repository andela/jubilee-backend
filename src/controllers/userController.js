import { UserService } from '../services';
import { Helpers } from '../utils';

const {
  successResponse, errorResponse, extractUserData
} = Helpers;

const { find, updateAny } = UserService;
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
      const user = await find({ id });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: error.message });
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
      errorResponse(res, { code: error.status, message: error.message });
    }
  }
}

export default UserController;
