import UserService from '../services';
import { ApiResponse, UserResponse, helpers } from '../utils';

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
      const { email, password } = req.body;
      const user = await userLogin(email);
      if (!user) {
        const msg = 'Invalid login details';
        return res.status(401).json(new ApiResponse(false, 401, msg));
      }
      if (!helpers.compare(password, user.password)) {
        const msg = 'Invalid login details';
        return res.status(401).json(new ApiResponse(false, 401, msg));
      }
      const loginResponse = new UserResponse(user);
      // const { token } = loginResponse;
      return res.status(200).json(new ApiResponse(true, 200, loginResponse));
    } catch (error) {
      const status = error.status || 500;
      res.status(status).json(new ApiResponse(false, status, error.message));
    }
  }
}
