import { hashSync, genSaltSync } from 'bcryptjs';
import database from '../models';

/**
 * UserService class, interface for UserModel
 */
export default class UserService {
  /**
   * Saves user in the database
   *
   * @param {object} user - The user to be saved in the database
   * @returns {Promise<object>} A promise object with user detail.
   */
  static create(user) {
    user.password = hashSync(user.password, genSaltSync(10));
    return database.User.create(user);
  }
}
