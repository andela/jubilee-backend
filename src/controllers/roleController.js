import { UserService, RoleService } from '../services';
import { Helpers } from '../utils';

const { find } = UserService;
const { successResponse, errorResponse } = Helpers;
const { getRoles, updateUserRole } = RoleService;

/**
 * A collection of methods that controls user Roles.
 *
 * @class Role
 */
class Role {
  /**
   *  assign a role to a user
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } - A JSON object containing success or failure details.
   * @memberof Role
   */
  static async updateUserRole(req, res) {
    try {
      const { email, roleId } = req.body;
      const user = await find(email);
      if (!user) {
        return errorResponse(res, { code: 404, message: 'User account does not exist' });
      }
      let userRole = await getRoles(user.id);
      if (userRole) {
        userRole = await updateUserRole(user.id, roleId);
        return successResponse(res, userRole, 200);
      }
    } catch (error) {
      errorResponse(res, {});
    }
  }
}

export default Role;
