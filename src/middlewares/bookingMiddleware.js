import { BookingValidator } from '../validation';
import { Helpers } from '../utils';

const { errorResponse } = Helpers;
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
    try {
      const validated = await BookingValidator.validateAccommodation(req.body);
      if (validated) {
        next();
      }
    } catch (err) {
      errorResponse(res, { code: err.status || 500, message: err.message });
    }
  }
}

export default BookingMiddleware;
