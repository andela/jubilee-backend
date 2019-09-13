import { RequestService, UserService } from '../services';
import { Helpers, Mailer, Notification } from '../utils';


const { getRequests, createTripRequest } = RequestService;
const { successResponse, errorResponse } = Helpers;
const { find } = UserService;

/**
 * A collection of methods that controls user requests.
 *
 * @class RequestController
 */
export default class RequestController {
  /**
 *  assign a role to a user
 * @static
 * @param {Request} req - The request from the endpoint.
 * @param {Response} res - The response returned by the method.
 * @returns { JSON } - A JSON object containing success or failure details.
 * @memberof RequestController
 */
  static async getUserRequests(req, res) {
    try {
      const { id } = req.data;
      const requests = await getRequests(id);
      if (!requests.length) {
        return errorResponse(res, { code: 404, message: 'You have made no request yet' });
      }
      return successResponse(res, requests, 200);
    } catch (e) {
      errorResponse(res, { code: 500, message: e.message });
    }
  }

  /**
   *  creates a one way trip request
   * @static
   * @param {Request} req - The request from the endpoint.
   * @param {Response} res - The response returned by the method.
   * @returns { JSON } - A JSON object containing success or failure details.
   * @memberof RequestController
   */
  static async oneWayTripRequest(req, res) {
    try {
      const { body, data: { id } } = req;
      const { requester } = req;
      const oneWayTrip = await createTripRequest({ ...body });
      delete oneWayTrip.returnDate;
      const { managerId } = oneWayTrip;
      const manager = await find({ id: managerId });
      const user = await find({ id });
      const {
        emailNotify, email, firstName, appNotify
      } = manager;
      const staffName = `${user.firstName} ${user.lastName}`;
      const dashboardLink = `${req.protocol}s://${req.get('host')}/api/users/profile/${managerId.id}`;
      if (emailNotify) {
        await Mailer.sendMail({
          email, emailTemplateId: 'd-4fa2b9e8173d4e4ba6b3d5f5e4c14308', firstName, urlLink: dashboardLink, staffName
        });
      }
      const notificationData = {
        message: `${staffName} created a new travel request`,
        url: 'https://barefootnomand/user/emma/trip/3'
      };
      if (appNotify) await Notification.notify(notificationData, [manager]);
      return successResponse(res, { ...oneWayTrip, ...requester }, 201);
    } catch (err) {
      errorResponse(res, {});
    }
  }
}
