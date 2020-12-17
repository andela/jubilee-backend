import db from '../models';
import { ApiError } from '../utils';

const { Request, Status, User } = db;

/**
 * RoleService class, interface for RoleUser model
 */
export default class RequestService {
  /**
  * Get user's request history from database
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
    * Allows user to create a trip request
    * @param {object} tripreq - the trip details object.
    * @return {Promise<object>} A promise object with trip request detail.
    * @memberof RequestService
    */
  static async createTripRequest(tripreq) {
    const { dataValues: newTripRequest } = await Request.create(tripreq);
    return newTripRequest;
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

  /**
    * Get Request by id and status
    * @param {object} id - the id of assigned manager
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
      where: { statusId, managerId: id }
    });
    if (!requests.dataValues.id) throw new ApiError(404, 'No such request');
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
      const [updated, [user]] = result;
      if (!updated) throw new ApiError(404, 'No such request');
      return user.dataValues;
    } catch (error) {
      throw new ApiError(error.status || 500, error.message);
    }
  }
}
