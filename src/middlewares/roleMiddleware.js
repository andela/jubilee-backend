import { helpers } from '../utils';
import { RoleService } from '../services/index';

const {
  verifyToken, errorResponse,
} = helpers;
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
  static async verifyCompanySuperAdmin(req, res, next) {
    try {
      const { token } = req.cookies;
      const { id } = verifyToken(token);
      const [{ dataValues: userWithRoles }] = await RoleService.getRoles(id);
      const roleObject = userWithRoles.roles;
      const [{ dataValues: unroledRowArray }] = roleObject;
      const { id: roleId } = unroledRowArray;
      if (roleId === 1) {
        return next();
      }
      return errorResponse(res, { code: 401, message: 'You are an unauthorized user' });
    } catch (error) {
      errorResponse(res, { code: 500, message: error.message });
    }
  }
}
