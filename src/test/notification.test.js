import chai, { expect } from 'chai';
import faker from 'faker';
import { newNotification, newSupplier } from './dummies';
import { NotificationService } from '../services';
import server from '..';

const {
  create, fetchAll, fetchUnread, findById, deleteOne, markAllAsRead, markOneAsRead
} = NotificationService;
describe('Notification service methods', () => {
  let notificationId;
  let userId;
  before(async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send({ ...newSupplier, email: faker.internet.email() });
    userId = response.body.data.user.id;
    await create({ ...newNotification, userId });
  });
  describe('Create method', () => {
    it('should create a new notification instance', async () => {
      const response = await create({ ...newNotification, userId });
      notificationId = response.id;
      expect(response).to.include.keys('id');
      expect(response).to.include.keys('status');
      expect(response).to.include.keys('message');
      expect(response).to.include.keys('url');
      expect(response).to.include.keys('userId');
      expect(response).to.include.keys('updatedAt');
      expect(response).to.include.keys('createdAt');
      expect(response.status).to.equal(newNotification.status);
      expect(response.message).to.equal(newNotification.message);
      expect(response.url).to.equal(newNotification.url);
      expect(response.userId).to.equal(userId);
    });
    it('should return all notifications for a specific user', async () => {
      const LIMIT = 1;
      const OFFSET = 0;
      const response = await fetchAll(userId, OFFSET, LIMIT);
      expect(Object.keys(response).length).to.be.above(0);
    });
    it('should return all unread notifications for a specific user', async () => {
      const LIMIT = 1;
      const OFFSET = 0;
      const response = await fetchUnread(userId, OFFSET, LIMIT);
      expect(Object.keys(response).length).to.be.above(0);
    });
    it('should return a specific notification by id', async () => {
      const response = await findById(notificationId);
      expect(Object.keys(response).length).to.be.above(0);
    });
    it('should mark a specific notification as read', async () => {
      const response = await markOneAsRead(notificationId);
      expect(Object.keys(response).length).to.be.above(0);
    });
    it('should mark all for a user notification as read', async () => {
      const response = await markAllAsRead(userId);
      expect(Object.keys(response).length).to.be.above(0);
    });
    it('should delete a specific notification', async () => {
      const response = await deleteOne(notificationId);
      expect(response).to.equal(1);
    });
  });
});
