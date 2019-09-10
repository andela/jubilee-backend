import { ProfileValidator, RequestValidator } from '../validation';
import { Helpers } from '../utils';

const { validateProfile } = ProfileValidator;
const { validateRequestUpdate } = RequestValidator;
const { errorResponse } = Helpers;
/**
 *
 * Its a collection of methods that perform different interactions
 * with CRUD operation requests for Facilities on the App
 *
 * * @class FacilityController
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

  /**
       * Middleware method for validating request on update.
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
    */
  static async onUpdateRequest(req, res, next) {
    try {
      const validated = await validateRequestUpdate(req.body);
      if (validated) {
        next();
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
}
