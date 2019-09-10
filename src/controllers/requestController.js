import { RequestService } from '../services';
import { Helpers, ApiError } from '../utils';


const {
  getRequests, getRequest, updateAnyRequest,
  getAllRequest
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
   * Get requests.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof RequestController
   */
  static async getAllRequest(req, res) {
    try {
      const requests = await getAllRequest();
      if (!requests) throw new ApiError(404, 'No requests available');
      successResponse(res, requests, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: `getAllRequest: ${error.message}` });
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
      const { status } = req.params;
      const requests = await getRequest(req.data.id, status);
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
}