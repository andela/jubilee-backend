import { hashSync, genSaltSync } from 'bcryptjs';
import database from '../models';
import Auth from '../utils/auth';

/**
 * UserService class, interface for UserModel
 */
export default class UserService {
  /**
   * @description Saves user in the database
   *
   * @param {object} user - The user to be saved in the database
   * @returns {Promise<object>} A promise object with user detail.
   */
  static create(user) {
    user.password = hashSync(user.password, genSaltSync(10));
    return database.User.create(user);
  }

  /**
 * @description Sign-in existing user
 * @param {object} userDetails user's login details
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
