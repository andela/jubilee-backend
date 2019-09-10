import { UserService, RequestService } from '../services';
import { Helpers, ApiError } from '../utils';

const {
  successResponse, errorResponse, extractUserData
} = Helpers;

const { find, updateAny } = UserService;
const {
  getRequest, updateAnyRequest, getAllRequest, myRequests, createRequest
} = RequestService;
/**
 * A collection of methods that controls user's interaction via the User routes
 *
 * @class UserController
 */
class UserController {
  /**
   * Gets a user profile after registeration or sign-in.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the user's profile details.
   * @memberof UserController
   */
  static async userProfile(req, res) {
    try {
      const id = req.params.userId;
      const user = await find({ id });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: error.message });
    }
  }

  /**
   * Updates a user profile.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async updateProfile(req, res) {
    try {
      const id = req.params.userId;
      const user = await updateAny(req.body, { id });
      const userResponse = extractUserData(user);
      successResponse(res, userResponse, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: error.message });
    }
  }

  /**
   * Get requests.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async getAllRequest(req, res) {
    try {
      const requests = await getAllRequest();
      if (!requests) throw new ApiError(404, 'No requests available');
      successResponse(res, requests, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: ` getAllRequest: ${error.message}` });
    }
  }

  /**
   * Get a users all requests.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async myRequests(req, res) {
    try {
      const { userId } = req.params;
      const requests = await myRequests(userId);
      if (!requests) throw new ApiError(404, 'No requests available for this user');
      successResponse(res, requests, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: ` myRequests: ${error.message}` });
    }
  }


  /**
   * Get requests.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async getRequest(req, res) {
    try {
      const { status } = req.params;
      const requests = await getRequest(req.data.id, status);
      if (!requests) throw new ApiError(404, 'No requests available');
      successResponse(res, requests, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: ` getRequest: ${error.message}` });
    }
  }


  /**
   * Updates request.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async updateRequest(req, res) {
    try {
      const { requestId } = req.params;
      const updateRequest = await updateAnyRequest(req.body, { id: requestId });
      successResponse(res, updateRequest, 200);
    } catch (error) {
      errorResponse(res, { code: error.status, message: ` updateRequest: ${error.message}` });
    }
  }


  /**
   * Create request.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response with the new user's profile update.
   * @memberof UserController
   */
  static async createRequest(req, res) {
    try {
      const request = await createRequest(req.body);
      successResponse(res, request, 201);
    } catch (error) {
      errorResponse(res, { code: error.status, message: ` createRequest: ${error.message}` });
    }
  }
}

export default UserController;
