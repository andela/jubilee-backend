import db from '../models';

const { Request, Status, User } = db;

/**
 * RequestService class, interface for CompanyModel
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
   * @memberof RequestService
   */
  static async findRequestById(requestId, options = {}) {
    return Request.findByPk(requestId, options);
  }

  /**
   * Fetches a request instance from the database based on it's primary key.
   * @static
   * @param {integer} id - Primary key of the request to be fetched.
   * @param {object} options - Additional query information
   * @returns {Promise<array>} - An instance of Request table including it's relationships.
   * @memberof RequestService
   */
  static async requestData(id, options) {
    const dataValues = await Request.findOne({
      where: { requesterId: id, rememberUserData: options, },
      order: [['createdAt', 'DESC']]
    });
    return dataValues;
  }
}
