import chai, { expect } from 'chai';
import io from 'socket.io-client';
import faker from 'faker';
import server from '..';
import { newNotification, newSupplier } from './dummies';

describe('Socket.io implemenations test', async () => {
  let user;
  const socketUrl = 'http://0.0.0.0:3000';
  const options = {
    transports: ['websocket', 'Polling'],
    'force new connection': true,
    query: {
      socketId: ''
    }
  };

  const checkNotification = (client, done) => {
    client.on('notification', (notification) => {
      expect(notification).to.be.an('object');
      expect(notification).to.have.property('id');
      expect(notification).to.have.property('status');
      expect(notification).to.have.property('message');
      expect(notification).to.have.property('url');
      expect(notification).to.have.property('userId');
      expect(notification).to.have.property('createdAt');
      client.disconnect();
      done();
    });
  };

  const checkMessage = (client, done) => {
    client.on('connected', (msg) => {
      expect(msg).to.equal('Socket.io registered!, you\'ll now recieve real-time updates while you remain online');
      client.disconnect();
      done();
    });
  };

  before(async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send({ ...newSupplier, email: faker.internet.email() });
    user = response.body.data.user;
    options.query.socketId = user.id;
  });

  it('should ensure that clients are able to connect', (done) => {
    const client = io.connect(socketUrl, options);
    checkMessage(client, done);
  });

  it('should ensure clients are able to recieve updates in real-time', (done) => {
    const client = io.connect(socketUrl, options);
    checkNotification(client, done);
    client.on('connect', async () => {
      await chai.request(server).post('/api/mock/notification').send({ notificationData: newNotification, toUsers: [user] });
    });
  });
});
