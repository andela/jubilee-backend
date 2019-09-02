import { UserService, SupplierService, CompanyService } from '../services';
import {
  Helpers, Mailer, ApiError
} from '../utils';


const {
  generateToken, verifyToken, successResponse, errorResponse, generateTokenAlive,
  extractUserData, comparePassword, splitCompanyData,
  hashPassword
} = Helpers;
const { createCompany, updateCompanyById } = CompanyService;
const { sendVerificationEmail, sendResetMail, sendWelcomeEmail } = Mailer;

const {
  create, updateById, updatePassword, find
} = UserService;
// const { createCompany } = companyService;

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
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      const userResponse = extractUserData(user);
      const isSent = await sendVerificationEmail(req, { ...userResponse });
      const { token } = userResponse;
      res.cookie('token', token, { maxAge: 86400000, httpOnly: true });
      return successResponse(res, { ...userResponse, emailSent: isSent }, 201);
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
      const [companyData, userData] = Helpers.splitSupplierData(req.body);
      let supplier = await SupplierService.create(companyData);
      const { id: supplierId } = supplier;
      let user = await UserService.create({ ...userData, supplierId });
      const companyToken = generateTokenAlive({ companyId: supplierId, defaultRoleId: 8, companyType: 'supplier' });
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      supplier = await SupplierService.update({ companyToken }, supplierId);
      user = extractUserData(user);
      const emailSent = await sendWelcomeEmail(req, { ...user, companyToken });
      res.cookie('token', user.token, { maxAge: 86400000, httpOnly: true });
      return successResponse(res, { user, supplier, emailSent }, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  }

  /**
   * Registers a new company.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the registered company's details and a JWT.
   * @memberof Auth
   */
  static async companySignUp(req, res) {
    try {
      const [companyInfo, userInfo] = splitCompanyData(req.body);
      userInfo.password = hashPassword(userInfo.password);
      const [{ id }, user] = await createCompany(companyInfo, userInfo);
      const companyToken = generateTokenAlive({ companyType: 'company', companyId: id, defaultRoleId: 1 });
      const company = await updateCompanyById({ companyToken }, id);
      user.token = generateToken({ email: user.email, id: user.id, role: 4 });
      const admin = extractUserData(user);
      const isSent = await sendWelcomeEmail(req, { companyToken, ...admin });
      res.cookie('token', user.token, { maxAge: 86400000, httpOnly: true });
      return successResponse(res, { admin, company, emailSent: isSent }, 201);
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
      const url = `${req.protocol}://${req.get('host')}/api/auth/password/reset/${email}`;
      successResponse(res, `Goto ${url} using POST Method`, 200);
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
      const user = await UserService.socialLogin(req.user);
      user.token = generateToken({ email: user.email, id: user.id, role: user.role });
      const userResponse = extractUserData(user);
      Helpers.successResponse(res, userResponse, 200);
    } catch (error) {
      Helpers.errorResponse(res, { code: error.statusCode, message: error.message });
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
