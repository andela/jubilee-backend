import authValidation from '../validation';
import { Helpers } from '../utils';
import { UserService } from '../services';

const {
  errorResponse
} = Helpers;
const { companySignup } = authValidation;
/**
 * Middleware for input validations
 */
export default class authMiddleware {
/**
     * Middleware method for user validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - Call the next operation.
     * @returns {object} - Returns an object (error or response).
     */
  static async onUserSignup(req, res, next) {
    try {
      const validated = await authValidation.userSignup(req.body);
      const { email } = req.body;
      if (validated) {
        const user = await UserService.find({ email });
        if (!user) {
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
        }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }

  /**
     * Middleware method for supplier validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - Call the next operation.
     * @returns {object} - Returns an object (error or response).
     */
  static async onSupplierSignup(req, res, next) {
    try {
      const validated = await authValidation.supplierSignup(req.body);
      const { email } = req.body;
      if (validated) {
        const supplier = await UserService.find({ email });
        if (!supplier) {
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
        }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }

  /**
     * Middleware method for company validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static async onCompanySignup(req, res, next) {
    const { email } = req.body;
    try {
      const validated = await companySignup(req.body);
      if (validated) {
        const admin = await UserService.find({ email });
        if (!admin) {
          return next();
        }
        if (admin.companyId) { errorResponse(res, { code: 409, message: `Admin with email: "${email}" already exists for a company` }); }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }
}
