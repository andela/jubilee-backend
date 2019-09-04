import { BookingService } from '../services';
import { Helpers } from '../utils';

const { errorResponse, successResponse } = Helpers;
const { createAccBooking } = BookingService;
/**
 * A collection of methods that controls booking activities via the booking routes
 *
 * @class BookingController
 */
class BookingController {
  /**
   * Creates accommodation booking.
   *
   * @static
   * @param {Request} req - The request from the browser.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the newly created booking.
   * @memberof BookingController
   */
  static async createAccBooking(req, res) {
    try {
      const booking = await createAccBooking(req.body);

      successResponse(res, booking, 201);
    } catch (err) {
      errorResponse(res, { code: err.status || 500, message: err.message });
    }
  }
}

export default BookingController;
