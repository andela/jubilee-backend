import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
<<<<<<< HEAD
import env from '../config/env-config';

const { SECRET, PORT } = env;
=======

const { SECRET } = process.env;
>>>>>>> b9d330d3c5eae113b2dbea528d57216e2ca73903

/**
 *Contains Helper methods
 *
 * @class Helpers
 */
<<<<<<< HEAD
class Helpers {
=======
export default class Helpers {
>>>>>>> b9d330d3c5eae113b2dbea528d57216e2ca73903
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
<<<<<<< HEAD
   * Generates email verification link
   * @static
   * @param { Request } req - Request object
   * @param { object } options - Contains user's data to be signed within Token.
   * @param { string } options.id - User's unique ID.
   * @param { string } options.email - User's email.
   * @param { string } options.role - User's role.
   * @memberof Helpers
   * @returns {URL} - Verification link.
   */
  static generateVerificationLink(req, { id, email, role }) {
    const token = Helpers.generateToken({ id, email, role });
    const host = req.hostname === 'localhost' ? `${req.hostname}:${PORT}` : req.hostname;
    return `${req.protocol}://${host}/api/auth/verify?token=${token}`;
  }

  /**
=======
>>>>>>> b9d330d3c5eae113b2dbea528d57216e2ca73903
 * Hashes a password
 * @static
 * @param {string} password - Password to encrypt.
 * @memberof Helpers
 * @returns {string} - Encrypted password.
 */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  }

  /**
 * Compares a password with a given hash
 * @static
 * @param {string} password - Plain text password.
 * @param {string} hash - Encrypted password.
 * @memberof Helpers
 * @returns {boolean} - returns true if there is a match and false otherwise.
 */
<<<<<<< HEAD
  static comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  /**
 * Generates a JSON response for success scenarios.
 * @static
 * @param {Response} res - Response object.
 * @param {object} data - The payload.
 * @param {number} code -  HTTP Status code.
 * @memberof Helpers
 * @returns {JSON} - A JSON success response.
 */
  static successResponse(res, data, code = 200) {
    return res.status(code).json({
      status: 'success',
      data
    });
  }

  /**
 * Generates a JSON response for failure scenarios.
 * @static
 * @param {Response} res - Response object.
 * @param {object} options - The payload.
 * @param {number} options.code -  HTTP Status code, default is 500.
 * @param {string} options.message -  Error message.
 * @param {object|array  } options.errors -  A collection of  error message.
 * @memberof Helpers
 * @returns {JSON} - A JSON failure response.
 */
  static errorResponse(res, { code = 500, message = 'Some error occurred while processing your Request', errors }) {
    return res.status(code).json({
      status: 'fail',
      error: {
        message,
        errors
      }
    });
  }
}

export default Helpers;
=======
  static compare(password, hash) {
    return bcrypt.compareSync(password, hash);
  }
}
>>>>>>> b9d330d3c5eae113b2dbea528d57216e2ca73903
