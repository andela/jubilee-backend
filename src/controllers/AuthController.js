import { UserService } from '../services';
import Helpers from '../utils/helpers';
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
      const userResponse = new UserResponse(createdUser);
      const isSent = await sendVerificationEmail(req, user);
      res.status(201).json(new ApiResponse(true, 201, { ...userResponse, emailSent: isSent }));
    } catch(error) {
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
    const { token } = req.params;
    const decoded = verifyToken(token);
    if (typeof decoded === 'string') {
      return res.status(400)
      .json(new ApiResponse(false, 400, 'Invalid token, verification unsuccessful'));
    }
    const user = await updateById({ isVerified: true }, decoded.id);
    if (!user) return res.status(500).json(new ApiResponse(false));
    const userResponse = new UserResponse(user);
    return res.status(200).json(new ApiResponse(true, 200, userResponse));
  }
}

export default Auth;
