import { ProfileValidator } from '../validation';
import { Helpers } from '../utils';

const { validateProfile } = ProfileValidator;
const { errorResponse } = Helpers;

/**
 * * @class UserMiddleware
 */
export default class UserMiddleware {
  /**
       * Middleware method for validating profile on update.
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
    */
  static async onUpdateProfile(req, res, next) {
    try {
      const validated = await validateProfile(req.body);
      if (validated) {
        next();
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
}
