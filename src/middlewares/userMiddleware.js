import userValidation from '../validation/index';
import { ApiResponse } from '../utils';
import UserService from '../services/index';

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
          res.status(409).json(new ApiResponse(false, 409, `User with email: "${req.body.email}" already exists`));
        }
      }
    } catch (error) {
      res.status(error.status || 500)
        .json(new ApiResponse(false, error.status || 500, error.message));
    }
  }
}
