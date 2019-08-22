import { UserService } from '../services/index';
import { ApiResponse } from '../utils/index';
import { TokenMiddleware } from '../middlewares/index';

/**
 * User controller class that implements crud operation in the database
 */
export default class UserController {
  /**
   * Gets user object from the request and saves it in the database
   *
   * @param {object} req - The request from the endpoint.
   * @param {object} res - The response returned by the method.
   * @returns {object} A response object with the registered user and a JWT.
   */
  static async createUser(req, res) {
    try {
      const user = req.body;

      const createdUser = await UserService.create(user);
      const generatedToken = TokenMiddleware.generateToken(createdUser.email);
      createdUser.token = generatedToken;
      res.status(201).json(new ApiResponse(true, 201, createdUser));
    } catch (error) {
      res
        .status(error.status || 500)
        .json(new ApiResponse(false, error.status || 500, error.message));
    }
  }
}
