import { Helpers } from '../utils';
import { RoleService } from '../services/index';

const {
  verifyToken, successResponse, errorResponse,
} = Helpers;
/**
 * Middleware for input validations
 */
export default class roleMiddleware {
/**
     * Middleware method for role permission checks
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static async verifyCompanySuperAdmin(req, res) {
    try {
      const { token } = req.headers;
      const { id } = verifyToken(token);
      const [{ dataValues: userWithRoles }] = await RoleService.getRoles(id);
      if (userWithRoles.roles[0].id === 1) {
        return successResponse(res, { ...userWithRoles }, 201);
      }
      return errorResponse(res, { code: 401, message: 'You are an unauthorized user' });
    } catch (error) {
      errorResponse(res, { code: 500, message: error.message });
    }
  }
}
