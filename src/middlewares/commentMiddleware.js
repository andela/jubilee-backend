import { OtherValidators } from '../validation';
import { Helpers } from '../utils';
import { RequestService } from '../services';

const { errorResponse } = Helpers;
const { commentValidator } = OtherValidators;
const { findRequestById } = RequestService;

/**
 *
 * A collection of methods that intercept requests on the Comment route
 *
 * * @class CommentMiddleware
 */
export default class CommentMiddleware {
  /**
   *
   * Validates comment field.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {Next} next - A function that activates the next middleware on the route.
   * @returns {object} - Returns an error if validation fails.
   * @memberof CommentMiddleware
   */
  static validateComment(req, res, next) {
    try {
      const validated = commentValidator(req.body);
      if (validated) {
        next();
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }

  /**
  * Verifies if user is the right author to create a comment on a specific travel request.
   * @static
   * @param {Request} req - Request object.
   * @param {Response} res - Response object.
   * @param {Next} next - A function that activates the next middleware on the route.
   * @returns {object} - Returns an error if authorization fails.
   * @memberof CommentMiddleware
   */
  static async verifyAuthor(req, res, next) {
    try {
      const { body: { requestId }, data: { id: userId } } = req;
      const options = { include: ['requester', 'manager'] };
      const request = await findRequestById(requestId, options);
      if (!request) {
        return errorResponse(res, {
          code: 404,
          message: `Travel Request of id: ${requestId} doesn't exist`
        });
      }
      const {
        manager: { id: managerId },
        requester: { id: requesterId }
      } = request.get({ plain: true });
      if ([managerId, requesterId].includes(userId)) return next();
      errorResponse(res, { code: 403, message: 'You are an unauthorized author' });
    } catch (err) {
      errorResponse(res, {});
    }
  }
}
