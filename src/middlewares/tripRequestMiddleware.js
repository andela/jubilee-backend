import { TripRequestValidation } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService } from '../services';

const { errorResponse } = Helpers;
const { tripRequest, multiCityRequest } = TripRequestValidation;
const { find } = UserService;

/**
 * Middleware for trip input validations
 */
export default class TripRequestMiddleware {
  /**
     * Middleware method for trip request validation
     * @param {boolean} isReturnTrip - Boolean for if it's a return trip
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - Call the next operation.
     * @returns {object} - Returns an object (error or response).
     */
  static onTripRequest(isReturnTrip) {
    return async (req, res, next) => {
      try {
        const validated = await multiCityRequest(req.body, isReturnTrip);
        const { email } = req.data;
        if (validated) {
          const {
            id, firstName, lastName, gender, lineManager, passportNo,
          } = await find({ email });
          const requesterObj = {
            firstName,
            lastName,
            gender,
            lineManager,
            passportNo,
          };
          if (id) {
            req.body.requesterId = id;
            req.requester = requesterObj;
            return next();
          }
        }
      } catch (error) {
        errorResponse(res, { code: error.status || 500, message: error.details[0].context.label });
      }
    }
  }

  /**
     * Validation of requester keys
     * @param {string} value - Value of key to validate.
     * @param {param} key - The key to validate.
     * @returns {object} - Returns an object (error or response).
     */
  static tripUserChecker(value, key) {
    if (!key) {
      throw new ApiError(400, `Please update your profile with your ${value}`);
    }
  }

  /**
       * Middleware method for trip request validation
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
       */
  static async tripCheckUser(req, res, next) {
    try {
      const { tripUserChecker } = TripRequestMiddleware;
      const {
        requesterGender, requesterLineManager, requesterPassportNo
      } = req.requester;
      tripUserChecker('Gender', requesterGender);
      tripUserChecker('Line Manager', requesterLineManager);
      tripUserChecker('PassportNo', requesterPassportNo);
      next();
    } catch (error) {
      errorResponse(res, { code: error.status || 500, message: error.message });
    }
  }
}
