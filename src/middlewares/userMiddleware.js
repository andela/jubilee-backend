import userValidation from '../validation/index';

/**
 * Middleware for input validations
 */
export default class ValidationMiddleware {
/**
     * Middleware for user validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static onSignup(req, res, next) {
    userValidation.signup(req, res, next);
  }
}
