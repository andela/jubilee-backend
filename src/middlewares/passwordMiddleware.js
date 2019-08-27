import { changePasswordSchema, passwordResetEmailSchema } from '../validation/passwordValidator';
import { ApiResponse } from '../utils/index';
import Helpers from '../utils/helpers';

const { validate } = Helpers;
/**
 * Collection of methods for ResetPassword
 * @class ResetPassword
 */
class ResetPassword {
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
        return res.status(400).json(new ApiResponse(false, 400, message));
      }
      next();
    } catch (err) {
      res.status(err.status || 500).json(new ApiResponse(false, err.status || 500, err.message));
    }
  }
}

export default ResetPassword;
