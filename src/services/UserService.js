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
* @param {object} userDetails user;s login details
* @param {object} res response object
* @returns {object}  JSON response
*/
  static async userLogin(userDetails, res) {
    const { email, password } = userDetails;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        error: 'Please provide complete login details'
      });
    }
    try {
      const user = await database.User.findOne({
        where: { email }
      });
      if (!user) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid login details',
        });
      }
      if (!Auth.compare(password, user.password)) {
        return res.status(401).json({
          status: 401,
          error: 'Invalid password',
        });
      }
      const { id, firstName, lastName } = user;
      const output = { email, firstName, lastName };
      const token = Auth.generateToken({ id, email });
      return res.status(200).json({
        status: 200,
        data: { token, ...output }
      });
    } catch (error) {
      return error;
    }
  }
} 
