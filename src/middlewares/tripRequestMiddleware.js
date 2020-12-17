import { TripRequestValidation } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService, RequestService } from '../services';

const { errorResponse } = Helpers;
const { tripRequest } = TripRequestValidation;
const { find } = UserService;
const { requestData } = RequestService;

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
      const { email } = req.data;
      if (validated) {
        const user = await find({ email });
        const requesterObj = {
          firstName: user.firstName,
          gastName: user.lastName,
          gender: user.gender,
          lineManager: user.lineManager,
          passportNumber: user.passportNumber,
        };
        if (user) {
          req.body.requesterId = user.id;
          req.requester = requesterObj;
          return next();
        }
        throw new ApiError(404, 'User does not exist');
      }
    } catch (error) {
      errorResponse(res, { code: error.status || 500, message: error.message });
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
        gender, lineManager, passportNumber
      } = req.requester;
      tripUserChecker('Gender', gender);
      tripUserChecker('Line Manager', lineManager);
      tripUserChecker('passportNumber', passportNumber);
      next();
    } catch (error) {
      errorResponse(res, { code: error.status || 500, message: error.message });
    }
  }

  /**
  * Middleware method for user data in request database
  * @param {object} req - The request from the endpoint.
  * @param {object} res - The response returned by the method.
  * @param {object} next - Call the next operation.
  * @returns {object} - next().
  */
  static async checkUserRecordExist(req, res, next) {
    try {
      const { requesterId } = req.body;
      const userData = await requestData(requesterId, true);
      if (userData) {
        const requesterObj = {
          accommodation: userData.accommodation,
          passportNumber: userData.passportNumber,
          passportName: userData.passportName,
          lineManager: userData.lineManager,
          gender: userData.gender,
          check: true,
        };
        req.requester = requesterObj;
        next();
      } else {
        next();
      }
    } catch (err) {
      errorResponse(res, { code: 500, message: err.message });
    }
  }
}
