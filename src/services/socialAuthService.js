/* eslint-disable prefer-destructuring */
/* eslint-disable no-underscore-dangle */
import { ApiError } from '../utils';
import db from '../models';

/**
 * @class SocialAuthServices
 *@description  Services class for creating user
 */

export default class SocialAuthService {
  /**
   * create or signin with users google data
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof SocialAuthServices
   * @returns {object} - the user data object
   *
   */
  static async socialCreate(userData, socialId = {}) {
    try {
      let existingUser = await db.User.findOne({
        where: socialId
      });
      if (!existingUser) {
        const user = {
          firstName: userData.name.givenName,
          lastName: userData.name.familyName,
          username: userData.name.givenName,
          email: userData.emails[0].value,
          profileImage: userData.photos[0].value,
          provider: userData.provider,
        };
        user[Object.keys(socialId)[0]] = Object.values(socialId)[0];
        existingUser = await db.User.create(user);
      }
      return existingUser.dataValues;
    } catch (error) {
      throw new ApiError(500, error.message);
    }
  }

  /**
   * create or signin with users facebook data
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof SocialAuthServices
   * @returns {object} - the user data object
   *
   */
  static async facebookCreate(userData) {
    return SocialAuthServices.socialCreate(userData, { facebookId: userData.id });
  }

  /**
   * create or signin with users google data
   *
   * @static
   * @param {object} req - request object
   * @param {object} res - response object
   * @memberof SocialAuthServices
   * @returns {object} - the user data object
   *
   */
  static async googleCreate(userData) {
    return SocialAuthServices.socialCreate(userData, { googleId: userData.id });
  }
}
