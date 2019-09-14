import { RequestService } from '../services';
import { Helpers, ApiError } from '../utils';

const {
  getRequests, getRequest, updateAnyRequest,
  getRequestByIdUserId, createTripRequest
} = RequestService;

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
      const { requester } = req;
      delete body.returnDate;
      const oneWayTrip = await createTripRequest({ ...body });
      return successResponse(res, { ...oneWayTrip, ...requester }, 201);
    } catch (error) {
      errorResponse(res, {});
    }
  }

  /**
   * Get requests.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof RequestController
   */
  static async getRequest(req, res) {
    try {
      const statusId = Number(req.params.statusId);
      const requests = await getRequest(req.data.id, statusId);
      if (!requests) throw new ApiError(404, 'No requests available');
      successResponse(res, requests, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: `getRequest: ${error.message}` });
    }
  }

  /**
   * Get requests.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof RequestController
   */
  static async getRequestByIdUserId(req, res) {
    try {
      const { requestId } = req.params;
      const requests = await getRequestByIdUserId(req.data.id, requestId);
      if (!requests) throw new ApiError(404, 'No requests available');
      successResponse(res, requests, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: `getRequest: ${error.message}` });
    }
  }

  /**
   * Updates request.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof RequestController
   */
  static async updateRequest(req, res) {
    try {
      const { requestId } = req.params;
      const updateRequest = await updateAnyRequest(req.body, { id: requestId });
      successResponse(res, updateRequest, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: `updateRequest: ${error.message}` });
    }
  }

  /**
   * Updates request.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof RequestController
   */
  static async updateUserRequest(req, res) {
    try {
      const { requestId } = req.params;
      const updateRequest = await updateAnyRequest(req.body, { id: requestId });
      successResponse(res, updateRequest, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: `updateRequest: ${error.message}` });
    }
  }
}
