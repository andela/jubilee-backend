import { Helpers, ApiError } from '../utils';
import { RoleService } from '../services/index';

const {
  errorResponse
} = Helpers;

const { getRoles } = RoleService;
/**
 * Middleware for input validations
 */
export default class roleMiddleware {
  /**
     * Middleware method for verifying roles
     * @param {array} permissions - The permission array.
     * @param {array} boolean - To activate verifyUniqueRole funciton
     * @returns {function} - returns a function
     */
  static verifyRoles(permissions) {
    return async function foo(req, res, next) {
      try {
        const { id } = req.data;
        const { roleId } = await getRoles(id);
        const permitted = permissions.includes(roleId);
        if (permitted) {
          return next();
        }
        return errorResponse(res, { code: 403, message: 'You are an unauthorized user' });
      } catch (error) {
        errorResponse(res, { code: 500, message: error.message });
      }
    };
  }
}
