import UserService from '../services';
import { ApiResponse, UserResponse } from '../utils';

const { userLogin } = UserService;
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
      const userResponse = new UserResponse(createdUser);
      res.status(201).json(new ApiResponse(true, 201, userResponse));
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json(new ApiResponse(false, status, error.message));
    }
  }

  /**
  *  Login an existing user
  * 
  * @param {object} req request object
  * @param {object} res reponse object
  * @returns {object} JSON response
  */
  static async loginUser(req, res) {
    try {
      return await userLogin(req.body, res);
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json(new ApiResponse(false, status, error.message));
    }
  }
}
