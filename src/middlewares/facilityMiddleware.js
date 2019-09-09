import { FacilityValidator } from '../validation';
import { Helpers } from '../utils';

const { validateFacility } = FacilityValidator;
const { errorResponse } = Helpers;
/**
 *
 * Its a collection of middlewares on the Facility Route
 *
 * * @class FacilityMiddleware
 */
export default class FacilityMiddleware {
  /**
      * Middleware method for validating facility upon creation.
      * @param {boolean} isCompany True if its a company facility object
       * @returns {function} - returns a function
     * and false if its a supplier facility.
     * @memberof FacilityMiddleware
     *
    */
  static onCreateFacility(isCompany) {
    return async (req, res, next) => {
      try {
        const validated = await validateFacility(req.body, isCompany);
        if (validated) {
          next();
        }
      } catch (error) {
        errorResponse(res, { code: 400, message: error.details[0].context.label });
      }
    };
  }
}
