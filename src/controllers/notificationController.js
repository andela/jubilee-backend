import { NotificationService } from '../services';
import { Helpers } from '../utils';

const { markAllAsRead } = NotificationService;
const { successResponse, errorResponse } = Helpers;

/**
 * A collection of methods for controlling notifications.
 *
 * @class Notification
 */
class Notification {
  /**
   *  Mark all notifications as read for a single user.
   * @static
   * @param {Request} req - Express request object.
   * @param {Response} res - Express response object.
   * @returns { JSON } - A JSON object containing success or failure response.
   * @memberof Notification
   */
  static async markAllAsRead(req, res) {
    try {
      const { id } = req.data;
      const notifications = await markAllAsRead(id);
      return successResponse(res, notifications, 200);
    } catch (error) {
      errorResponse(res, {});
    }
  }
}

export default Notification;
