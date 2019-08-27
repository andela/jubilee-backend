import userValidation from '../validation/index';
import { Helpers } from '../utils';
import { UserService } from '../services/index';

const {
  errorResponse
} = Helpers;
/**
 * Middleware for input validations
 */
export default class ValidationMiddleware {
/**
     * Middleware method for user validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static async onSignup(req, res, next) {
    try {
      const validated = await userValidation.signup(req.body);
      if (validated) {
        const user = await UserService.find(req.body.email);
        if (!user) {
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
        }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
}
