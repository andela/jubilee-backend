import { TripRequestValidation } from '../validation';
import { Helpers, ApiError } from '../utils';
import { RoleService } from '../services';

const { errorResponse } = Helpers;
const { tripRequest, tripRequestReturn } = TripRequestValidation;
const { getRoles } = RoleService;

/**
 * Middleware for trip input validations
 */
export default class TripRequestMiddleware {
  /**
     * Middleware method for trip request validation
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - Call the next operation.
     * @returns {object} - Returns an object (error or response).
     */
  static async onTripRequest(req, res, next) {
    try {
      const validated = await tripRequest(req.body);
      const { tripType } = req.body;
      const { id } = req.data;
      if (tripType === 'One-way' && validated) {
        delete validated.returnDate;
        req.body.requesterId = id;
        return next();
      }
      const retrunTripValidated = await tripRequestReturn(validated);
      if (tripType === 'Round-Trip' && retrunTripValidated) return next();
      console.log(tripType);
      throw new ApiError(400, 'tripType is invalid');
    } catch (error) {
      errorResponse(res, { code: error.status || 500, message: error.message });
    }
  }

  /**
       * Middleware method for trip request validation
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
       */
  static async checkManagerId(req, res, next) {
    try {
      const { managerId } = req.body;
      const { roleId } = await getRoles(managerId);
      if (roleId === 5) return next();
      throw new ApiError(400, 'The user with this ID is not a manager');
    } catch (error) {
      errorResponse(res, { code: error.status || 500, message: error.message });
    }
  }
}
