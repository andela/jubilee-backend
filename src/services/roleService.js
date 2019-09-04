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
  static async assignRole(userId, roleId) {
    const { dataValues: newAssignment } = await RoleUser.create({ userId, roleId });
    return newAssignment;
  }

  /**
   * get roles of a user
   * @param {string} id - user email
   * @returns {Promise<object>} A promise object with user and role detail.
   */
  static async getRoles(id) {
    const [{ dataValues: userRoles }] = await RoleUser.findAll({ where: { userId: id } });
    return userRoles;
  }

  /**
   * Update user role in the database
   *
   * @param {integer} userId - The user Id
   * @param {integer} roleId - The role Id
   * @returns {Promise<object>} A promise object with user role detail.
   */
  static async updateUserRole(userId, roleId) {
    const [rowaffected, [user]] = await RoleUser.update({ roleId },
      { returning: true, where: { userId } });
    if (!rowaffected) throw new Error('Not Found');
    return user;
  }
}
