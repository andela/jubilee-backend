import { RequestValidator } from '../validation';
import { RequestService } from '../services';
import { Helpers, ApiError } from '../utils';

const { validateRequestUpdate } = RequestValidator;
const { errorResponse } = Helpers;

const { getRequestByFields } = RequestService;

/**
 *
 * * @class RequestMiddleware
 */
export default class RequestMiddleware {
  /**
       * Middleware method for validating request on update.
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
    */
  static async onRequestStatus(req, res, next) {
    try {
      let status;
      if (Number(req.params.requestId)) req.params.requestId = Number(req.params.requestId);
      if (req.body && req.params) {
        status = { ...req.body, ...req.params };
      } else if (req.params) {
        status = { ...req.params };
      } else {
        status = { ...req.body };
      }
      if (await validateRequestUpdate(status)) {
        next();
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }

  /**
       * Middleware to check if req status is pending and if user owns the request.
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
    */
  static async isUsersOwnIsStatus(req, res, next) {
    try {
      const { requestId } = req.params;
      const requestObj = await getRequestByFields({ id: requestId });
      if (requestObj.statusId !== 2) throw new ApiError(400, 'This request is not pending');
      if (requestObj.requesterId !== req.data.id) throw new ApiError(401, 'You have no permission to edit this request');
      if (req.body.statusId || req.body.requesterId) throw new ApiError(401, 'You can not edit this field');
      next();
    } catch (error) {
      errorResponse(res, { code: error.status, message: error.message });
    }
  }
}
