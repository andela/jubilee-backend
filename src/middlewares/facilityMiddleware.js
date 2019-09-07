import { FacilityValidator } from '../validation';
import { Helpers } from '../utils';

const { validateFacility } = FacilityValidator;
const { errorResponse } = Helpers;
/**
 *
 * Its a collection of methods that perform different interactions
 * with CRUD operation requests for Facilities on the App
 *
 * * @class FacilityController
 */
export default class FacilityMiddleware {
  /**
       * Middleware method for validating facility upon creation.
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
    */
  static async onCreateFacility(req, res, next) {
    try {
      const validated = await validateFacility(req.body);
      if (validated) {
        next();
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
}
