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
    res.status(200).json({ data: 'works' });
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
    res.status(200).json({ data: 'works' });
  }
}

export default UserController;
