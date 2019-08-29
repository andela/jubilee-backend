import { Helpers, ApiError } from '../utils';

const { verifyToken, errorResponse, checkToken } = Helpers;

/**
 * Middleware for Authentication
 */
export default class Authentication {
  /**
  * Middleware method for user authentication
  * @param {object} req - The request from the endpoint.
  * @param {object} res - The response returned by the method.
  * @param {object} next - the returned values going into the next operation.
  * @returns {object} - next().
  */
  static isAuthenticated(req, res, next) {
    try {
      const { userId } = req.params;
      const token = checkToken(req);
      const { id } = verifyToken(token);
      if (userId === id) {
        next();
      } else {
        throw new ApiError(401, 'Access denied, check your inputed details');
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }
}
