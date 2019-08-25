/* eslint-disable no-underscore-dangle */
import { ApiError } from '../utils';
import db from '../models';

/**
 * @class SocialAuthServices
 *@description  Services class for creating user
 */

export default class SocialAuthService {
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
    try {
      let existingUser = await db.User.findOne({
        where: {
          facebookId: userData._json.id
        }
      });
      if (!existingUser) {
        existingUser = await db.User.create({
          facebookId: userData._json.id,
          firstName: userData._json.first_name,
          lastName: userData._json.last_name,
          username: userData._json.first_name,
          email: userData._json.email,
          profileImage: userData._json.picture.data.url,
          provider: userData.provider,
        });
      }
      return existingUser.dataValues;
    } catch (error) {
      throw new ApiError(500, error.message);
    }
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
    try {
      let existingUser = await db.User.findOne({
        where: {
          googleId: userData._json.sub
        }
      });
      if (!existingUser) {
        existingUser = await db.User.create({
          firstName: userData._json.given_name,
          lastName: userData._json.family_name,
          username: userData._json.given_name,
          email: userData._json.email,
          profileImage: userData._json.picture,
          provider: userData.provider,
          googleId: userData._json.sub,
          preferredLanguage: userData._json.locale
        });
      }
      return existingUser.dataValues;
    } catch (error) {
      // throw new ApiError(500, 'Social:googleSignin Internal Server Error');
      throw new ApiError(500, error.message);
    }
  }
}
