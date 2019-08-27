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
    const { dataValues: newUser } = await User.create(user);
    return newUser;
  }

  /**
   *
   * updates an existing user by ID
   * @static
   * @param {object} userData user properties to be updated
    * @param {string} id user id
   * @returns {Promise<object | null | string> } an object containing the updated
   * properties of the user is returned on success
   * or a null value if update fails, and an error message if a user is not found
   * @memberof UserService
   */
  static async updateById(userData, id) {
    const [rowaffected, [user]] = await User.update(userData, { returning: true, where: { id } });
    if (!rowaffected) throw new Error('Not Found');
    return user;
  }

  /**
 * @description Sign-in existing user
 * @param {object} email user's registered email
 * @returns {Promise<object>} A promise object with user detail.
 */
  static userLogin(email) {
    return database.User.findOne({
      where: { email }
    });
  }
}
