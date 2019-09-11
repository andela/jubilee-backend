import { BookingValidator } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService, RoomService } from '../services';

const { errorResponse } = Helpers;
const { validateAccommodation } = BookingValidator;
const { findRoom } = RoomService;
/**
 * Collection of methods for BookingMiddleware
 * @class BookingMiddleware
 */
export default class BookingMiddleware {
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
      const { body } = req;
      const { userId, roomId } = body;
      const validated = await validateAccommodation(body);
      const user = await UserService.find({ id: userId });
      const room = await findRoom({ id: roomId });

      if (!user) throw new ApiError(404, `User with id ${userId} does not exist`);
      if (!room) throw new ApiError(404, `Room with id: ${roomId} does not exist`);
      if (validated) next();
    } catch (err) {
      errorResponse(res, { code: err.status || 500, message: err.message });
    }
  }
}
