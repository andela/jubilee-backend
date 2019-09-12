import { RequestService } from '../services';
import { Helpers } from '../utils';


const { getRequests, createTripRequest } = RequestService;
const { successResponse, errorResponse } = Helpers;

/**
 * A collection of methods that controls user requests.
 *
 * @class RequestController
 */
export default class RequestController {
  /**
 *  assign a role to a user
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } - A JSON object containing success or failure details.
 * @memberof RequestController
 */
  static async getUserRequests(req, res) {
    try {
      const { id } = req.data;
      const requests = await getRequests(id);
      if (!requests.length) {
        return errorResponse(res, { code: 404, message: 'You have made no request yet' });
      }
      return successResponse(res, requests, 200);
    } catch (e) {
      errorResponse(res, { code: 500, message: e.message });
    }
  }

  /**
   *  creates a one way trip request
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } - A JSON object containing success or failure details.
   * @memberof RequestController
   */
  static async oneWayTripRequest(req, res) {
    try {
      const { body } = req;
      const {
        firstName, lastName, gender,
      } = req.data;
      const oneWayTrip = await createTripRequest({ ...body });
      oneWayTrip.firstName = firstName;
      oneWayTrip.lastName = lastName;
      oneWayTrip.gender = gender;
      return successResponse(res, oneWayTrip, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  }
}
