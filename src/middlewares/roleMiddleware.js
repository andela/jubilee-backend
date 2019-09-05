import { Helpers } from '../utils';
import { RoleService } from '../services/index';

const {
  verifyToken, errorResponse,
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
  static async verifyCompanyRoles(req, res, next) {
    try {
      const { token } = req.cookies;
      const { permissionId } = req.body;
      const { id } = verifyToken(token);
      const { roleId } = await RoleService.getRoles(id);
      if (permissionId === 5 && roleId === permissionId) {
        return next();
      }
      if (permissionId < 5) {
        if (roleId <= permissionId) {
          return next();
        }
      }
      return errorResponse(res, { code: 401, message: 'You are an unauthorized user' });
    } catch (error) {
      errorResponse(res, { code: 500, message: error.message });
    }
  }

  /**
     * Middleware method for role permission checks on supplier roles
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static async verifySupplierRoles(req, res, next) {
    try {
      const { token } = req.cookies;
      const { permissionId } = req.body;
      const { id } = verifyToken(token);
      const { roleId } = await RoleService.getRoles(id);
      if (permissionId === 8 && roleId === permissionId) {
        return next();
      }
      if (permissionId < 8 && permissionId > 5) {
        if (roleId <= permissionId) {
          return next();
        }
      }
      return errorResponse(res, { code: 401, message: 'You are an unauthorized user' });
    } catch (error) {
      errorResponse(res, { code: 500, message: error.message });
    }
  }
}
