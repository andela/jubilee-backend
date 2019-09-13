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
}
