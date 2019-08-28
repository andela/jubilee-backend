import { changePasswordSchema, passwordResetEmailSchema } from '../validation/passwordValidator';
import { helpers } from '../utils';

const { validate, errorResponse } = helpers;
/**
 * Collection of methods for ResetPassword
 * @class ResetPassword
 */
class PasswordMiddleware {
  /**
     * Middleware for password reset form
     *
     * @param {Request} req - The request from the endpoint.
     * @param {Response} res - The response returned by the method.
     * @param {Next} next
     * @returns {next} - Continue with the request.
     * @memberof ResetPassword
     */
  static checkParameters(req, res, next) {
    try {
      const result = validate(req.body, (req.body.email) ? passwordResetEmailSchema
        : changePasswordSchema);
      if (result.error !== null) {
        const { message } = result.error.details[0];
        return errorResponse(res, { code: 400, message });
      }
      next();
    } catch (err) {
      errorResponse(res, { code: 500, message: err.message });
    }
  }
}

export default PasswordMiddleware;
