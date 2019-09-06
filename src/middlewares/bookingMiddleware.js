import { BookingValidator } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService } from '../services';

const { errorResponse, verifyToken } = Helpers;
const { find } = UserService;
/**
 * Collection of methods for BookingMiddleware
 * @class BookingMiddleware
 */
class BookingMiddleware {
  /**
   *
   * Validates booking fields
   * @static
   * @param {Request} req - request object from the browser.
   * @param {Response} res - response object returned to the browser.
   * @param {Next} next - the returned values going into the next operation.
   * @returns {object} Returns an true if validation passes or error if validation fails.
   * @memberof BookingMiddleware
   */
  static async validateFields(req, res, next) {
    // TODO: add validation for room
    try {
      const { body } = req;
      const { userId } = body;
      const { authorization } = req.headers;
      const validated = await BookingValidator.validateAccommodation(body);
      const user = await find({ id: userId });
      verifyToken(authorization);

      if (!user) {
        throw new ApiError(404, `User with id ${userId} is not found`);
      }
      if (validated) {
        next();
      }
    } catch (err) {
      errorResponse(res, { code: err.status || 500, message: err.message });
    }
  }
}

export default BookingMiddleware;
