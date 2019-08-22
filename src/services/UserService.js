import { Helpers } from '../utils';
import db from '../models';

const { hashPassword } = Helpers;
const { User } = db;

/**
 * UserService class, interface for UserModel
 */
export default class UserService {
  /**
   * Saves user in the database
   * @static
   * @param {object} user - The user to be saved in the database.
   * @returns {Promise<object>} A promise object with user detail.
   * @memberof UserService
   */
  static async create(user) {
    user.password = hashPassword(user.password);
    const { dataValues: user } = await User.create(user);
    return user;
  }
 /**
   *
   * updates an existing user by ID
   * @static
   * @param {object} userData user properties to be updated
    * @param {string} id user id
   * @returns {Promise<object | null> } an object containing the updated properties of
   * a the user on success or a null value if update fails
   * @memberof UserService
   */
  static async updateById(userData, id) {
    try {
      const [, [user]] = await User.update(userData, { returning: true, where: { id } });
      return user;
    } catch (e) {
      return null;
    }
  }
  
}
