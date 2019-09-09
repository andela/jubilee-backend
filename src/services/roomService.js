import db from '../models';

const { Room } = db;
/**
 * A collection of methods that handles the business logic for room service
 *
 * @class RoomService
 */
export default class RoomService {
  /**
   * Find a room
   * @param {number | object | string} options - room search value
   * @returns {Promise<object>} A promise object with room detail.
   * @memberof RoomService
   */
  static async findRoom(options) {
    return Room.findOne({ where: options });
  }
}
