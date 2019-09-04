import db from '../models';

const { AccommodationBooking } = db;
/**
 * A collection of methods that handles the business logic for booking travels
 *
 * @class BookingService
 */
class BookingService {
  /**
   *
   * Create accommodation booking and saves it in the database
   * @static
   * @param {object} booking - booking properties to be saved in the database
   * @returns {Promise<object | null | string> } an object containing the booking properties that was created
   * @memberof BookingService
   */
  static async createAccBooking(booking) {
    const { dataValues: newBooking } = await AccommodationBooking.create(
      booking
    );
    return newBooking;
  }
}

export default BookingService;
