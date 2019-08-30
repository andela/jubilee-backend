import { Helpers, ApiError } from '../utils';
import db from '../models';

const { RoleUser, Role, User } = db;

/**
 * RoleService class, interface for RoleUser model
 */
export default class RoleService {
  /**
    * Assigns role to user
    * @param {object} userId - the id of assigned user.
    * @param {object} roleId - the id of role to be assigned.
    * @return {Promise<object>} A promise object with role detail.
    * @memberof RoleService
    */
  static async assign(userId, roleId) {
    const { dataValues: newAssignment } = await RoleUser.create({ userId, roleId });
    return newAssignment;
  }

  /**
   * get roles of a user
   * @param {string} id - user email
   * @returns {Promise<object>} A promise object with user and role detail.
   */
  static async getRoles(id) {
    return User.findAll({
      include: [{
        model: Role,
        as: 'roles',
        required: false,
        attributes: ['id', 'label'],
        through: { attributes: [] }
      }],
      where: { id }
    });
  }
}
