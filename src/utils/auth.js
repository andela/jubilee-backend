import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();
const sCrypt = process.env.SECRET;

/**
 * @description Class of Authentication methods
 */
class Auth {
  /**
   * @param {string} password password string to be hashed
   * @returns {string} hashed password
   */
  static hash(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  }

  /**
   * @param {string} password provided password
   * @param {string} hash hashed password in database
   * @returns {Boolean} returns true or false
   */
  static compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
   * @description Generates access token
   * @param {object} payload User credential(s)
   * @param {string} secret encryption key
   * @param {string} duration token expiry time
   * @returns {string} Access token
   */
  static generateToken(payload, secret = sCrypt, duration = '7d') {
    return jwt.sign(payload, secret, { expiresIn: duration });
  }
}

export default Auth;
