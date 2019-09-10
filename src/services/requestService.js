import sequelize from 'sequelize';
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
  * @returns {Promise<object>} A promise object with user requests.
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
    * Get all Requests
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async getAllRequest() {
    const requests = await Request.sequelize.query('SELECT * FROM requests', { type: sequelize.QueryTypes.SELECT });
    return requests;
  }

  /**
    * Get all Users Requests
    * @param { integer } userId
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async myRequests(userId) {
    const requests = await Request.sequelize.query(`SELECT * FROM requests Where "requesterId"=${userId}`, { type: sequelize.QueryTypes.SELECT });
    return requests;
  }

  /**
    * Get Request by id and status
    * @param {object} id - the id of assigned manager || requester.
    * @param {object} status - the status of the request.
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RequestService
    */
  static async getRequest(id, status) {
    const requests = await Request.sequelize.query(
      `select requests.id, requests."requesterId", requests."managerId", requests."accBookingId", requests.status, 
      requests."tripType", requests.purpose, requests.origin, requests.destination, requests."departureDate",
      requests."returnDate", "Users".id as userId, "Users"."firstName", "Users"."lastName", "Users".email  FROM requests INNER JOIN 
      "Users" ON requests."requesterId"="Users".id WHERE (("requesterId"=${id} OR "managerId"=${id}) AND status='${status}');
    `, { type: sequelize.QueryTypes.SELECT }
    );
    return requests;
  }

  /**
   * Function for update query
   *
   * @param {Object} updateValues - Object of fields to be updated
   * @param {string} obj - An object of the keys to be searched e.g {id}, {email}
   * @memberof UserService
   * @returns {Promise<object>} A promise object with user detail.
   */
  static async updateAnyRequest(updateValues, obj) {
    try {
      const result = await Request.update(
        updateValues,
        { where: obj, returning: true }
      );
      const [bool, [user]] = result;
      if (!bool) throw new ApiError(404, 'Not such request');
      return user.dataValues;
    } catch (error) {
      throw new ApiError(error.status || 500, `requestService: update - ${error.message}`);
    }
  }

  /**
   * Function for Create query
   *
   * @param {Object} req - Object of fields used to create
   * @memberof UserService
   * @returns {Promise<object>} A promise object with user detail.
   */
  static async createRequest(req) {
    try {
      const { dataValues: newRequest } = await Request.create(req);
      return newRequest;
    } catch (error) {
      throw new ApiError(error.status || 500, `requestService: createRequest - ${error.message}`);
    }
  }
}
