import { FacilityService, UserService } from '../services';
import { Helpers } from '../utils';

const { createFacility, roomStatusUpdate } = FacilityService;
const { find } = UserService;
const { errorResponse, successResponse } = Helpers;

/**
 * A collection of methods that controls CRUD operations for  facilities
 * on the App.
 * @class FacilityController
 */
class FacilityController {
  /**
   * Registers a new user.
   *
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } A JSON response containing .
   * @memberof FacilityController
   */
  static async createCompanyFacility(req, res) {
    try {
      const { id } = req.data;
      const { companyId } = await find({ id });
      const facility = await createFacility({ ...req.body, companyId, companyType: 'company' });
      return successResponse(res, { facility }, 201);
    } catch (err) {
      return errorResponse(res, {});
    }
  }

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
      const { supplierId } = await find({ id });
      const facility = await createFacility({ ...req.body, companyType: 'supplier', supplierId });
      return successResponse(res, facility, 201);
    } catch (error) {
      const status = error.status || 500;
      errorResponse(res, { code: status, message: error.message });
    }
  }

  /**
 * updates room availability.
 *
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } A JSON response with the registered company's details and a JWT.
 * @memberof Auth
 */
  static async roomUpdate(req, res) {
    try {
      let { roomId } = req.params;
      roomId = Number(roomId);
      console.log('roomid: ', roomId);
      const { roomStatus } = req.body;
      console.log('room status: ', roomStatus);
      const roomUpdated = await roomStatusUpdate(roomId, roomStatus);
      console.log('room update: ', roomUpdated);
      return successResponse(res, roomUpdated, 200);
    } catch (error) {
      const status = error.status || 500;
      console.log('error: ', error.message);
      errorResponse(res, { code: status, message: error.message });
    }
  }
}

export default FacilityController;
