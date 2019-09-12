import { NotificationService } from '../services';

const { create } = NotificationService;
/**
 * Contains methods for handling notifications
 *
 * @class Notification
 */
class Notification {
  /**
   * Notifies an array of users of an event - also ensure realtime update
   * @param {object} notificationData - The notification object without userId.
   * @param {array} toUsers - An array of users to notified.
   * @returns {Promise<array>} - An array of newly created notifaction instances.
   * @memberof Notification
   */
  static async notify(notificationData, toUsers) {
    const notifications = toUsers.map((user) => {
      const notification = { ...notificationData, userId: user.id };
      return Notification.add(notification, user.id);
    });
    return Promise.all(notifications);
  }

  /**
   * Sends realtime notification update to client using event emitters.
   * @param {object} notification - A newly created notification instance to
   *  be sent as payload to the client.
   * @param {integer} socketId - The socketId of the user to be notified.
   * @returns {null} null
   * @memberof Notification
   */
  static async realTimeNotify(notification, socketId) {
    try {
      await global.activeSockets[socketId].emit('notification', notification);
    } catch (err) {
      throw new Error('Failed to send realtime notification');
    }
  }

  /**
 * Adds a new notification to the db and triggers realtime notification
 * @param {object} notificationData - The notification object with userId.
 * @param {integer} socketId - The socketId of the user to be notified.
 * @returns {Promise} notification - A newly created notification instance.
 * @memberof Notification
 */
  static async add(notificationData, socketId) {
    try {
      const notification = await create(notificationData);
      await this.realTimeNotify(notification, socketId);
      return notification;
    } catch (err) {
      throw new Error(err.message || 'Failed to create notification');
    }
  }
}

export default Notification;
