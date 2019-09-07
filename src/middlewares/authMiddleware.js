import { AuthValidation } from '../validation';
import { Helpers, ApiError } from '../utils';
import { UserService, SupplierService, CompanyService } from '../services';

const {
  errorResponse, verifyToken, checkToken, verifySignupToken, comparePassword
} = Helpers;

const { companySignup, userLogin } = AuthValidation;
const { findSupplier } = SupplierService;
const { findCompany } = CompanyService;
/**
 * Middleware for input validations
 */
export default class AuthMiddleware {
/**
     * Middleware method for user validation during signup/registration
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object (error or response).
     */
  static async onUserSignup(req, res, next) {
    try {
      const validated = await AuthValidation.userSignup(req.body);
      if (validated) {
        const { email } = req.body;
        const member = await UserService.find({ email });
        if (!member) {
          const [establishment, establishmentId] = verifySignupToken(req.body.signupToken);
          if (establishment === 'supplier') {
            const supplier = await findSupplier({ id: establishmentId });
            if (!supplier) {
              return errorResponse(res, { code: 401, message: 'Please make sure your token is valid, we cannot locate supplier details' });
            }
            if (!comparePassword(req.body.signupToken, supplier.companyToken)) {
              return errorResponse(res, { code: 401, message: 'Please make sure your token is valid, we cannot locate supplier details' });
            }
            req.body.supplierId = establishmentId;
            req.body.roleId = 8;
            return next();
          }
          if (establishment === 'company') {
            const company = await findCompany({ id: establishmentId });
            if (!company) {
              return errorResponse(res, { code: 401, message: 'Please make sure your token is valid, we cannot locate company details' });
            }
            if (!comparePassword(req.body.signupToken, company.companyToken)) {
              return errorResponse(res, { code: 401, message: 'Please make sure your token is valid, we cannot locate supplier details' });
            }
            req.body.companyId = establishmentId;
            req.body.roleId = 5;
            return next();
          }
        }
        errorResponse(res, { code: 409, message: `User with email: "${req.body.email}" already exists` });
      }
    } catch (error) {
      let status = 500;
      if (error.details[0].context.label) { status = 400; }
      errorResponse(res, {
        code: status, message: error.details[0].context.label || error.message
      });
    }
  }

  /**
       * Middleware method for user validation during login
       * @param {object} req - The request from the endpoint.
       * @param {object} res - The response returned by the method.
       * @param {object} next - Call the next operation.
       * @returns {object} - Returns an object (error or response).
       */
  static async onUserLogin(req, res, next) {
    try {
      const validated = await userLogin(req.body);
      if (validated) {
        next();
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
      const validated = await AuthValidation.supplierSignup(req.body);
      const { email } = req.body;
      if (validated) {
        const supplier = await UserService.find({ email });
        if (!supplier) {
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${email}" already exists for a supplier` });
        }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }

  /**
    * Middleware method for user authentication
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - the returned values going into the next operation.
    * @returns {object} - next().
    */
  static isAuthenticated(req, res, next) {
    try {
      const { userId } = req.params;
      const token = checkToken(req);
      const { id } = verifyToken(token);
      if (Number(userId) === id) {
        next();
      } else {
        throw new ApiError(401, 'Access denied, check your inputed details');
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }

  /**
    * Middleware method for authentication
    * @param {object} req - The request from the endpoint.
    * @param {object} res - The response returned by the method.
    * @param {object} next - the returned values going into the next operation.
    * @returns {object} - next().
    */
  static authenticate(req, res, next) {
    try {
      const token = checkToken(req);
      if (!token) return errorResponse(res, { code: 401, message: 'You are not logged in' });
      const decoded = verifyToken(token);
      req.data = decoded;
      next();
    } catch (err) {
      errorResponse(res, { code: 401, message: err.message });
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
          next();
        } else {
          errorResponse(res, { code: 409, message: `User with email: "${email}" already exists for a company` });
        }
      }
    } catch (error) {
      errorResponse(res, { code: 400, message: error.details[0].context.label });
    }
  }

  /**
     * Middleware method for checking if user is a supplier admin
     * @param {object} req - The request from the endpoint.
     * @param {object} res - The response returned by the method.
     * @param {object} next - the returned values going into the next operation.
     * @returns {object} - returns an object or boolean (userData or false).
     */
  static async isSupplierAdmin(req, res, next) {
    try {
      const { data } = req;
      const { isSupplierAdmin, supplierId } = data;
      if (isSupplierAdmin && supplierId) {
        req.supplier = { supplierId };
        next();
      } else {
        errorResponse(res, { code: 401, message: 'Access denied, you\'d have to be a supplier admin to access this enpoint' });
      }
    } catch (err) {
      const status = err.status || 500;
      errorResponse(res, { code: status, message: err.message });
    }
  }
}
