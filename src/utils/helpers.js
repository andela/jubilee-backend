import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import env from '../config/env-config';

const { SECRET, PORT } = env;

/**
 *Contains Helper methods
 *
 * @class Helpers
 */
class Helpers {
  /**
 *  Synchronously sign the given payload into a JSON Web Token string.
 * @static
 * @param {string | number | Buffer | object} payLoad Payload to sign.
 * @param {string | number} expiresIn Expressed in seconds or a string describing a
 * time span. Eg: 60, "2 days", "10h", "7d". Default specified is 7days.
 * @memberof Helpers
 * @returns {string} JWT token.
 */
  static generateToken(payLoad, expiresIn = '7d') {
    return jwt.sign(payLoad, SECRET, { expiresIn });
  }

  /**
   *
   *  Synchronously verify the given JWT token using a secret
   * @static
   * @param {*} token - JWT token.
   * @returns {string | number | Buffer | object } - Decoded JWT payload if
   * token is valid or an error message if otherwise.
   * @memberof Helpers
   */
  static verifyToken(token) {
    try {
      return jwt.verify(token, SECRET);
    } catch (err) {
      throw new Error('Invalid Token');
    }
  }

  /**
   * Generates email verification link
   * @static
   * @param { Request } req - Request object
   * @param { object } options - Contains user's data to be signed within Token.
   * @param { string } options.id - User's unique ID.
   * @param { string } options.firstName - User's first name.
   * @param { string } options.role - User's role.
   * @memberof Helpers
   * @returns {URL} - Verification link.
   */
  static generateVerificationLink(req, { id, firstName, role }) {
    const token = Helpers.generateToken({ id, firstName, role });
    const host = req.hostname === 'localhost' ? `${req.hostname}:${PORT}` : req.hostname;
    return `${req.protocol}://${host}/api/auth/verify?token=${token}`;
  }

  /**
 * Hashes a password
 * @static
 * @param {string} password - Password to encrypt.
 * @memberof Helpers
 * @returns {string} - Encrypted password.
 */
  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  /**
 * Compares a password with a given hash
 * @static
 * @param {string} password - Plain text password.
 * @param {string} hash - Encrypted password.
 * @memberof Helpers
 * @returns {boolean} - returns true if there is a match and false otherwise.
 */
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}

export default Helpers;
