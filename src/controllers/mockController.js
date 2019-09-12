import { Notification, Helpers } from '../utils';

const { notify } = Notification;
const { successResponse, errorResponse } = Helpers;
/**
 * A collection of methods that mocks specific functionalities on the App.
 * @class MockController
 */
class MockController {
  /**
   * Creates new notification(s) and emits real-time notification event to registered clients
   * using socket.io.
   *
   * @static
   * @param {Request} req - The express.js request object.
   * @param {Response} res - The express.js reponse object.
   * @returns { JSON } A JSON response containing a status and an array of notification(s).
   * @memberof MockController
   */
  static async notify(req, res) {
    try {
      const { notificationData, toUsers } = req.body;
      const notifications = await notify(notificationData, toUsers);
      return successResponse(res, { notifications }, 201);
    } catch (err) {
      return errorResponse(res, {});
    }
  }
}

export default MockController;
