import { TripRequestValidation } from '../validation';
import { Helpers } from '../utils';
import { UserService } from '../services';

const { verifyToken, errorResponse } = Helpers;
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
      const { token } = req.cookies;
      const { email } = verifyToken(token);
      if (validated) {
        const user = await find({ email });
        if (user) {
          req.body.requesterId = user.id;
          next();
        }
        errorResponse(res, { code: 404, message: 'User does not exist' });
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
}
