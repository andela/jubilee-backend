import { FacilityService, UserService } from '../services';
import { Helpers } from '../utils';

const { createFacility } = FacilityService;
const { find } = UserService;
const { successResponse, errorResponse } = Helpers;

/**
 * Facility Controller.
 *
 * @class FacilityController
 */
class FacilityController {
/**
 * Adds a new facility.
 *
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response with the registered company's details and a JWT.
 * @memberof Auth
 */
  static async addFacilitySupplier(req, res) {
    try {
      const { id } = req.data;
      const { supplierId } = find({ id });
      const facility = await createFacility({ ...req.body, companyType: 'supplier', supplierId });
      return successResponse(res, facility, 201);
    } catch (error) {
      const status = error.status || 500;
      errorResponse(res, { code: status, message: error.message });
    }
  }
}

export default FacilityController;
