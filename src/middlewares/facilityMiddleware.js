import { FacilityValidator } from '../validation';
import { FacilityService } from '../services';
import { Helpers } from '../utils';

const { validateFacility } = FacilityValidator;
const { errorResponse } = Helpers;
const { findFacilityById } = FacilityService;
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

  /**
    * Middleware method to authenticate facility.
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - Call the next operation.
    *@returns {object} - Returns an object (error or response).
    * @memberof FacilityMiddleware
    *
    */
  static async authenticateFacility(req, res, next) {
    try {
      let { facilityId } = req.params;
      facilityId = Number(facilityId);
      const { dataValues: facility } = await findFacilityById(facilityId);
      if (facility) {
        return next();
      }
    } catch (err) {
      errorResponse(res, { code: 401, message: err.message });
    }
  }
}
