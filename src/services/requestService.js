import db from '../models';
import { ApiError } from '../utils';

const {
  Request, Status, User, TripDetail, sequelize
} = db;

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
   * @memberof FacilityService
   */
  static async findRequestById(requestId, options = {}) {
    return Request.findByPk(requestId, options);
  }

  /**
  * Create Multi-city trip request
  * @static
  * @param {objet} tripreq - The user id
  * @returns {Promise<object>} A promise object with user requests.
  * @memberof RequestService
  */
  static async createMultiCityTrip(tripreq) {
    try {
      const result = await sequelize.transaction(async () => {
        const options = { include: [{ model: TripDetail, as: 'tripDetails' }] };
        const { dataValues: newMultiRequest } = await Request.create(tripreq, options);
        return newMultiRequest;
      });
      return result;
    } catch (error) {
      throw new ApiError(500, 'Failed to create request. Try again');
    }
  }
}
