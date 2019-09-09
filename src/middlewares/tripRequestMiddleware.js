import { TripRequestValidation } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService, RequestService } from '../services';

const { errorResponse, verifyToken } = Helpers;
const { tripRequest } = TripRequestValidation;
const { find } = UserService;
const { findUserRecord } = RequestService;

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
          requesterFirstName: user.firstName,
          requesterLastName: user.lastName,
          requesterGender: user.gender,
          requesterLineManager: user.lineManager,
          requesterPassportNo: user.passportNo,
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
        requesterGender, requesterLineManager, requesterPassportNo
      } = req.requester;
      tripUserChecker('Gender', requesterGender);
      tripUserChecker('Line Manager', requesterLineManager);
      tripUserChecker('PassportNo', requesterPassportNo);
      next();
    } catch (error) {
      errorResponse(res, { code: error.status || 500, message: error.message });
  static async checkUserRecordExist(req, res, next) {
    try {
      const { token } = req.cookies;
      const { email } = verifyToken(token);
      const userData = await findUserRecord({ email });
      if (userData) {
        req.body.accommodation = userData.accommodation;
        req.body.passportNumber = userData.passportNumber;
        req.body.passportName = userData.passportName;
        req.body.lineManager = userData.lineManager;
        req.body.gender = userData.gender;
        next();
      } else {
        next();
      }
    } catch (err) {
      errorResponse(res, { code: 500, message: err.message });
    }
  }
}
