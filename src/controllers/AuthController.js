import { UserService } from '../services';
import { Helpers, UserResponse } from '../utils';
import Mailer from '../utils/mailer';

const {
  generateToken, verifyToken, successResponse, errorResponse
} = Helpers;
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
  static async signUp(req, res) {
    try {
      const { body } = req;
      const user = await create({ ...body });
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      const userResponse = new UserResponse(user);
      const isSent = await sendVerificationEmail(req, { ...userResponse });
      return successResponse(res, { ...userResponse, emailSent: isSent }, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  }

  /**
   *
   *  verifies user's email address
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } - A JSON object containing success or failure details.
   * @memberof Auth
   */
  static async verifyEmail(req, res) {
    try {
      const { token } = req.query;
      const decoded = verifyToken(token);
      const user = await updateById({ isVerified: true }, decoded.id);
      const userResponse = new UserResponse(user);
      successResponse(res, { ...userResponse });
    } catch (e) {
      if (e.message === 'Invalid Token') {
        return errorResponse(res, { code: 400, message: 'Invalid token, verification unsuccessful' });
      }

      if (e.message === 'Not Found') {
        return errorResponse(res, { code: 400, message: 'no user found to verify' });
      }
      errorResponse(res, {});
    }
  }
}

export default Auth;
