import db from '../models';

const { Notification } = db;

/**
 * A collection of methods that handles the database interactions
 * for managing a Facility as an entity of the App.
 *
 * @class NotificationService
 */
class NotificationService {
  /**
   * Fetches a notification instance based on it's primary key.
   * @static
   * @param {integer} notificationId - Primary key of the notification to be fetched.
   * @param {object} options - Additional query information
   * @returns {Promise<array>} - An instance of notification table including it's relationships.
   * @memberof NotificationService
   */
  static async findById(notificationId, options = {}) {
    const notification = await Notification.findByPk(notificationId, options);
    return notification;
  }

  /**
   * Create a new notification instance.
   * @static
   * @param {Object} data - A notification object.
   * @returns {Promise<Array>} A promise object with updated room properties.
   * @memberof NotificationService
   */
  static async create(data) {
    const { dataValues: notification } = await Notification.create(data);
    return notification;
  }

  /**
   * Fetches all notifications for a specific user - read or unread.
   * @static
   * @param {integer} userId - The user's Id.
   * @param {integer} offset - An offset signifying where to start from - zero based.
   * @param {integer} limit - The maximum number of notifications to be returned per call.
   * @returns {Promise<array>} - An instance of notification table including it's relationships.
   * @memberof NotificationService
   */
  static async fetchAll(userId, offset = 0, limit = 10) {
    return await Notification.findAll({
      where: { userId },
      order: [['id', 'DESC']],
      offset,
      limit
    });
  }

  /**
   * Fetches all unread notifications for a specific user.
   * @static
   * @param {integer} userId - The user's Id.
   * @param {integer} offset - An offset signifying where to start from - zero based.
   * @param {integer} limit - The maximum number of notifications to be returned per call.
   * @returns {Promise<array>} - An instance of notification table including it's relationships.
   * @memberof NotificationService
   */
  static async fetchUnread(userId, offset = 0, limit = 10) {
    return await Notification.findAll({
      where: { userId, status: 'unseen' },
      order: [['id', 'DESC']],
      offset,
      limit
    });
  }

  /**
    * Updates the status of a specific notification to seen.
    * @static
    * @param {integer} notificationId - The user's Id.
    * @returns {Promise<array>} - An instance of notification table including it's relationships.
    * @memberof NotificationService
*/
  static async markOneAsRead(notificationId) {
    const [rowAffected, [notification]] = await Notification.update({ status: 'seen' }, {
      where: { id: notificationId },
      returning: true
    });
    if (!rowAffected) throw new Error('Not Found');
    return notification;
  }

  /**
    * Updates all notifications' status to seen for a specific user.
    * @static
    * @param {integer} userId - The user's Id.
    * @returns {Promise<array>} - An instance of notification table including it's relationships.
    * @memberof NotificationService
*/
  static async markAllAsRead(userId) {
    const [, notification] = await Notification.update({ status: 'seen' }, {
      where: { userId, status: 'unseen' },
      returning: true
    });
    return notification;
  }

  /**
    * Updates all notifications' status to seen for a specific user.
    * @static
    * @param {integer} notificationId - The notification Id.
    * @returns {Promise<array>} - An instance of notification table including it's relationships.
    * @memberof NotificationService
*/
  static async deleteOne(notificationId) {
    return await Notification.destroy({
      where: { id: notificationId },
    });
  }
}

export default NotificationService;
