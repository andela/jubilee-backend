import { TripRequestValidation } from '../validation';
import { Helpers } from '../utils';
import { UserService } from '../services';

const { errorResponse } = Helpers;
const { tripRequest } = TripRequestValidation;
const { find } = UserService;

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
        if (user) {
          req.body.requesterId = user.id;
          req.data.firstName = user.firstName;
          req.data.lastName = user.lastName;
          req.data.gender = user.gender;
          req.data.lineManager = user.lineManager;
          return next();
        }
        errorResponse(res, { code: 404, message: 'User does not exist' });
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
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
      const {
        firstName, lastName, gender, lineManager
      } = req.data;
      if (firstName === null) {
        errorResponse(res, { code: 400, message: 'Please update your profile with your firstName' });
      }
      if (lastName === null) {
        errorResponse(res, { code: 400, message: 'Please update your profile with your lastName' });
      }
      if (gender === null) {
        errorResponse(res, { code: 400, message: 'Please update your profile with your gender' });
      }
      if (lineManager === null) {
        errorResponse(res, { code: 400, message: 'Please update your profile with your lineManager' });
      }
      next();
    } catch (error) {
      errorResponse(res, {});
    }
  }
}
