import chai, { expect } from 'chai';
import faker from 'faker';
import { newNotification, newSupplier } from './dummies';
import { NotificationService } from '../services';
import { AuthController } from '../controllers';
import server from '..';

const {
  create, fetchAll, fetchUnread, findById, deleteOne, markAllAsRead, markOneAsRead
} = NotificationService;
const { supplierSignup } = AuthController;
describe('Notification service methods', () => {
  let notificationId;
  let userId;
  const req = {
    body: { ...newSupplier, email: faker.internet.email() }
  };

  const res = {
    cookie() { return this; },
    status() { return this; },
    json(obj) { return obj; }
  };
  before(async () => {
    const response = await supplierSignup(req, res);
    userId = response.data.user.id;
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

describe('Notification mock route', () => {
  const toUsers = [];
  const req = {
    body: { ...newSupplier, email: faker.internet.email() }
  };

  const res = {
    cookie() { return this; },
    status() { return this; },
    json(obj) { return obj; }
  };

  before(async () => {
    let userOne = await supplierSignup(req, res);
    userOne = userOne.data.user;
    toUsers.push(userOne);
  });

  it('should create a new notification for a specific user', async () => {
    const response = await chai
      .request(server)
      .post('/api/mock/notification')
      .send({ notificationData: newNotification, toUsers });
    expect(response).to.have.status(201);
    expect(response.body.status).to.equal('success');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');
    expect(response.body.data.length).to.equal(1);
  });
  it('should create new notifications for multiple users', async () => {
    // create second user
    const req = {
      body: { ...newSupplier, email: faker.internet.email() }
    };
    let userTwo = await supplierSignup(req, res);
    userTwo = userTwo.data.user;
    toUsers.push(userTwo);
    // create notification
    const response = await chai
      .request(server)
      .post('/api/mock/notification')
      .send({ notificationData: newNotification, toUsers });
    expect(response).to.have.status(201);
    expect(response.body.status).to.equal('success');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');
    expect(response.body.data.length).to.equal(2);
  });
  it('should return a server error for missing required fields', async () => {
    const response = await chai
      .request(server)
      .post('/api/mock/notification')
      .send({ notificationData: newNotification });
    expect(response).to.have.status(500);
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.have.property('error');
    expect(response.body.error).to.be.an('object');
    expect(response.body.error).to.have.property('message');
    expect(response.body.error.message).to.equal('Double check that the required parameters are provided');
  });
});

describe('Mark all notifications as read', () => {
  let token;
  let userId;
  const req = {
    body: { ...newSupplier, email: faker.internet.email() }
  };

  const res = {
    cookie() { return this; },
    status() { return this; },
    json(obj) { return obj; }
  };

  before(async () => {
    const response = await supplierSignup(req, res);
    token = response.data.user.token;
    userId = response.data.user.id;
  });

  it('should return success when no notification status was updated', async () => {
    const response = await chai
      .request(server)
      .patch('/api/notification/status/seen')
      .set('authorization', `Bearer ${token}`);
    expect(response).to.have.status(200);
    expect(response.body.status).to.equal('success');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');
    expect(response.body.data.length).to.equal(0);
  });
  it('should return success when notifications status are updated to seen', async () => {
    await create({ ...newNotification, userId });
    const response = await chai
      .request(server)
      .patch('/api/notification/status/seen')
      .set('authorization', `Bearer ${token}`);
    expect(response).to.have.status(200);
    expect(response.body.status).to.equal('success');
    expect(response.body).to.have.property('data');
    expect(response.body.data).to.be.an('array');
    expect(response.body.data.length).to.equal(1);
  });
});
