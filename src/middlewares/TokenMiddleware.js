import jwt from 'jsonwebtoken';

const { SECRET } = process.env;

/**
 * Middleware that generates and validates tokens
 */
export default class TokenMiddleware {
  /**
   * Generates a token with user email as its payload
   *
   * @param {string} email - The email to save as payload in the token.
   * @returns {sring} A jwt token with user email as its payload
   */
  static generateToken(email) {
    return jwt.sign({ email }, SECRET, { expiresIn: '1h' });
  }
}
