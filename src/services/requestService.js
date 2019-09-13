import db from '../models';
import { ApiError } from '../utils';
import RoomService from './roomService';
import FacilityService from './facilityService';

const {
  Request, Status, User, AccommodationBooking
} = db;

const { findRoom } = RoomService;
const { findFacilityById } = FacilityService;
/**
 * RoleService class, interface for RoleUser model
 */
export default class RequestService {
  /**
    * Get a request by any field
    * @return {Promise<object>} A promise object with role detail.
    * @param {object} fieldObj An object of specified field
    * @memberof RequestService
    */
  static async getRequestByFields(fieldObj) {
    const requestObj = await Request.findOne({
      where: fieldObj
    });
    return requestObj.dataValues;
  }

  /**
    * Allows user to create a trip request
    * @param {object} tripreq - the id of assigned user.
    * @return {Promise<object>} A promise object with trip request detail.
    * @memberof RequestService
    */
  static async createTripRequest(tripreq) {
    const { dataValues: newTripRequest } = await Request.create(tripreq);
    return newTripRequest;
  }

  /**
    * Get Request by id and status
    * @param {object} id - the id of assigned manager || requester.
    * @param {object} requestId - the status of the request.
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async getRequestByIdUserId(id, requestId) {
    const requests = await Request.findOne({
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ['firstName', 'lastName']
        },
        {
          model: AccommodationBooking,
          as: 'bookings',
          attributes: ['checkIn', 'checkOut', 'roomId']
        }
      ],
      where: { requesterId: id, id: requestId }
    });
    if (requests.length === 0) throw new ApiError(404, 'No such request');
    const rooms = await RequestService.requestRoooms(requests.dataValues.bookings);
    const facilities = await RequestService.roomFacility(rooms);
    const result = { data: requests.dataValues, rooms, facilities };
    return result;
  }

  /**
    * Get Rooms associated with request
    * @param {array} bookingArray - an array of booked rooms
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async requestRoooms(bookingArray) {
    const rooms = [];
    bookingArray.forEach(async (element) => {
      rooms.push(await findRoom({ id: element.roomId }));
    });
    return rooms;
  }

  /**
    * Get Facility associated with reoom
    * @param {array} roomArray - an array of booked rooms
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async roomFacility(roomArray) {
    const facilities = [];
    if (roomArray.length === 0) return [];
    roomArray.forEach(async (element) => {
      facilities.push(await findFacilityById(element.facilityId));
    });
    return facilities;
  }

  /**
  * Get user's request history from daabase
  * @static
  * @param {integer} id - The user id
  * @returns {Promise<object>} A promise object with user Requests.
  * @memberof RequestService
  */
  static async getRequests(id) {
    return Request.findAll({
      include: [{
        model: Status,
        as: 'status',
        attributes: ['label']
      },
      {
        model: User,
        as: 'manager',
        attributes: ['lineManager']
      }],
      where: { requesterId: id }
    });
  }

  /**
    * Get Request by id and status
    * @param {object} id - the id of assigned manager || requester.
    * @param {object} statusId - the status of the request.
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async getRequest(id, statusId) {
    const requests = await Request.findOne({
      include: [
        {
          model: User,
          as: 'requester',
          attributes: ['firstName', 'lastName']
        }],
      where: { statusId }
    });
    if (requests.length === 0) throw new ApiError(404, 'No such request');
    return requests.dataValues;
  }

  /**
   * Function for update query
   *
   * @param {Object} updateValues - Object of fields to be updated
   * @param {string} obj - An object of the keys to be searched e.g {id}, {email}
   * @memberof RequestService
   * @returns {Promise<object>} A promise object with user detail.
   */
  static async updateAnyRequest(updateValues, obj) {
    try {
      const result = await Request.update(
        updateValues,
        { where: obj, returning: true }
      );
      const [bool, [user]] = result;
      if (!bool) throw new ApiError(404, 'No such request');
      return user.dataValues;
    } catch (error) {
      throw new ApiError(error.status || 500, error.message);
    }
  }

  /**
   * Fetches a request instance from the database based on it's primary key.
   * @static
   * @param {integer} requestId - Primary key of the request to be fetched.
   * @param {object} options - Additional query information
   * @returns {Promise<array>} - An instance of Request table including it's relationships.
   * @memberof FacilityService
   */
  static async findRequestById(requestId, options = {}) {
    return Request.findByPk(requestId, options);
  }
}
