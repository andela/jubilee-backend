<<<<<<< HEAD
import { authValidation } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService } from '../services';

const {
  errorResponse, verifyToken, checkToken
} = Helpers;
=======
import authValidation from '../validation/index';
import { helpers } from '../utils';
import { userService } from '../services/index';

const {
  errorResponse
} = helpers;
>>>>>>> bg(conflict): refactored code and fixed merge conflics
/**
 * Middleware for input validations
 */
export default class AuthMiddleware {
/**
     * Middleware method for user validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static async onUserSignup(req, res, next) {
    try {
      // this destructuring was written to make testing easier, as roleId is needed to test
      // other methods
      const {
        firstName, lastName, email, password, gender, street, city, state,
        country, birthdate, phoneNumber, companyName,
      } = req.body;
      const user = {
        firstName,
        lastName,
        email,
        password,
        gender,
        street,
        city,
        state,
        country,
        birthdate,
        phoneNumber,
        companyName,
      };
      // it should take all body and split in future. for testing
      // at this time, it takes only the property it needs
      // original: const validated = await authValidation.userSignup(req.body);
      const validated = await authValidation.userSignup(user);
      if (validated) {
<<<<<<< HEAD
        const user = await UserService.find({ email });
        if (!user) {
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
=======
        const member = await userService.find({ email });
        if (!member) {
          return next();
>>>>>>> bg(conflict): refactored code and fixed merge conflics
        }
        errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
      }
    } catch (error) {
      let status = 500;
      if (error.details[0].context.label) { status = 400; }
      errorResponse(res, {
        code: status, message: error.details[0].context.label || error.message
      });
    }
  }

  /**
     * Middleware method for supplier validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - Call the next operation.
     * @returns {object} - Returns an object (error or response).
     */
  static async onSupplierSignup(req, res, next) {
    try {
      const validated = await authValidation.supplierSignup(req.body);
      const { email } = req.body;
      if (validated) {
<<<<<<< HEAD
        const supplier = await UserService.find({ email });
=======
        const supplier = await userService.find({ email });
>>>>>>> bg(conflict): refactored code and fixed merge conflics
        if (!supplier) {
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
        }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
<<<<<<< HEAD

  /**
    * Middleware method for user authentication
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - the returned values going into the next operation.
    * @returns {object} - next().
    */
  static isAuthenticated(req, res, next) {
    try {
      const { userId } = req.params;
      const token = checkToken(req);
      const { id } = verifyToken(token);
      if (Number(userId) === id) {
        next();
      } else {
        throw new ApiError(401, 'Access denied, check your inputed details');
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }
=======
>>>>>>> bg(conflict): refactored code and fixed merge conflics
}
