import { userService, supplierService, RoleService } from '../services';
import {
  helpers, Mailer, ApiError
} from '../utils';

const {
  generateToken, verifyToken, successResponse, errorResponse, extractUserData, comparePassword,
  splitSupplierData
} = helpers;
const { sendVerificationEmail, sendResetMail } = Mailer;
const {
  create, updateById, updatePassword, find, socialLogin,
} = userService;

const { assign } = RoleService;
const { update } = supplierService;
/**
 * A collection of methods that controls authentication responses.
 *
 * @class Auth
 */
class AuthController {
  /**
   * Registers a new user.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details and a JWT.
   * @memberof Auth
   */
  static async userSignup(req, res) {
    try {
      const { body } = req;
      const user = await create({ ...body });
      /**
       * TODO: ROLE ID INTEGRATION UPON USER SIGNUP
       * the user role should be extracted in a token on signup
       * for testing I've assigned the default role Id as 1 (super Administrator)
       * Note, super Administrator should only be assigned during company /suppler signup
       * In future implementation, once supplier and company signup is done, the user
       * should give this value in a token upon signup
       */
      const defaultRoleId = 1;
      const roleAssignment = await assign(user.id, defaultRoleId);
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      const userResponse = extractUserData(user);
      const isSent = await sendVerificationEmail(req, { ...userResponse });
      const { token } = userResponse;
      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      return successResponse(res, { ...userResponse, emailSent: isSent, roleAssignment }, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  }

  /**
   * Registers a new supplier.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the registered user's details, company details & a JWT.
   * @memberof Auth
   */
  static async supplierSignup(req, res) {
    try {
      const [companyData, userData] = splitSupplierData(req.body);
      let supplier = await supplierService.create(companyData);
      const { id: supplierId } = supplier;
      let user = await userService.create({ ...userData, supplierId });
      const companyToken = generateToken({ companyId: supplierId, defaultRoleId: 8, companyType: 'supplier' });
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      supplier = await update({ companyToken }, supplierId);
      user = extractUserData(user);
      const emailSent = await sendVerificationEmail(req, user);
      res.cookie('token', user.token, { maxAge: 86400000, httpOnly: true });
      return successResponse(res, { user, supplier, emailSent }, 201);
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
      const userResponse = extractUserData(user);
      successResponse(res, { ...userResponse });
    } catch (e) {
      if (e.message === 'Invalid Token') {
        return errorResponse(res, { code: 400, message: 'Invalid token, verification unsuccessful' });
      }

      if (e.message === 'Not Found') {
        return errorResponse(res, { code: 400, message: 'No user found to verify' });
      }
      errorResponse(res, {});
    }
  }

  /**
   * Sends a user reset password link
   *
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns {JSON} A JSON response with a successfully message.
   * @memberof Auth
   */
  static async sendResetPasswordEmail(req, res) {
    try {
      const { email } = req.body;
      const user = await find({ email });
      if (!user) {
        throw new ApiError(404, 'User account does not exist');
      }
      const { firstName, id } = user;
      const token = generateToken({ firstName, id, email }, '24h');
      const url = `${req.protocol}://${req.get('host')}/api/auth/reset-password?token=${token}`;
      const response = await sendResetMail({
        email, firstName, resetPasswordLink: url
      });
      if (response === true) {
        successResponse(res, 'Password reset link sent successfully', 200);
      } else {
        throw new ApiError(404, response);
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }

  /**
   * Gets user new password object from the request and saves it in the database
   *
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns {JSON} A JSON response with the registered user and a JWT.
   * @memberof Auth
   */
  static async resetPassword(req, res) {
    try {
      const { password } = req.body;
      const { email } = req.params;
      const [updatedPassword] = await updatePassword(password, email);
      if (updatedPassword === 1) {
        successResponse(res, 'Password has been changed successfully', 200);
      } else {
        throw new ApiError(404, 'User account does not exist');
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }

  /**
   * Verify password reset link token
   *
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns {JSON} A JSON response with password reset link.
   * @memberof Auth
   */
  static verifyPasswordResetLink(req, res) {
    try {
      const { token } = req.query;
      const { email } = verifyToken(token);
      const url = `${req.protocol}s://${req.get('host')}/api/auth/password/reset/${email}`;
      successResponse(res, `Goto ${url} using POST Method with body "password": "newpassword" and "confirmPassword": "newpassword"`, 200);
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: `Verification unsuccessful, ${err.message}` });
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
      const user = await find({ email });
      if (!user) {
        return errorResponse(res, { code: 401, message: 'Invalid login details' });
      }
      if (!comparePassword(password, user.password)) {
        return errorResponse(res, { code: 401, message: 'Invalid login details' });
      }
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      const loginResponse = extractUserData(user);
      const { token } = loginResponse;
      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      successResponse(res, { ...loginResponse });
    } catch (error) {
      errorResponse(res, {});
    }
  }

  /**
   * create with facebook data
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof SocialLogin
   * @returns {object} - response body
   *
   */
  static async socialLogin(req, res) {
    try {
      const user = await socialLogin(req.user);
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: error.message });
    }
  }

  /**
   *  successfully logout a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } - A JSON object containing success or failure details.
   * @memberof Auth
   */
  static logout(req, res) {
    try {
      res.clearCookie('token', { httpOnly: true });
      return successResponse(res, { code: 200, message: 'You have been successfully logged out' });
    } catch (error) {
      errorResponse(res, { message: error.message });
    }
  }
}

export default AuthController;
