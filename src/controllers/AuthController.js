import { UserService } from '../services';
import { Helpers, UserResponse, ApiResponse } from '../utils';
import Mailer from '../utils/mailer';


const { verifyToken } = Helpers;
const { sendVerificationEmail } = Mailer;
const { create, updateById } = UserService;
/**
 * A collection of methods that controls authentication responses.
 *
 * @class Auth
 */
class Auth {
  /**
   * Registers a new user.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof Auth
   */
  static async register(req, res) {
    try {
      const { body } = req;
      const user = await create({ ...body });
      const userResponse = new UserResponse(user);
      const isSent = await sendVerificationEmail(req, user);
      res.status(201).json(new ApiResponse(true, 201, { ...userResponse, emailSent: isSent }));
    } catch (error) {
      res.status(500).json(new ApiResponse(false));
    }
  }

  /**
   *
   *  verifies user's email address
   * @static
   * @param {Request} req request object
   * @param {Response} res response object
   * @returns { JSON } returns a JSON object containing success or failure details
   * @memberof Auth
   */
  static async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      const decoded = verifyToken(token);
      const user = await updateById({ isVerified: true }, decoded.id);
      const userResponse = new UserResponse(user);
      return res.status(200).json(new ApiResponse(true, 200, userResponse));
    } catch (e) {
      if (e.message === 'Invalid Token') {
        res.status(400)
          .json(new ApiResponse(false, 400, 'Invalid token, verification unsuccessful'));
      }
      if (e.message === 'Not Found') {
        res.status(400)
          .json(new ApiResponse(false, 400, 'no user found to verify'));
      }
      res.status(500).json(new ApiResponse(false));
    }
  }
}

export default Auth;
