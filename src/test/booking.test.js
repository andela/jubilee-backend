import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import server from '../index';
import { BookingController } from '../controllers';
import { newSupplier, newFacility, newUser } from './dummies';

chai.use(chaiHttp);
chai.use(sinonChai);

describe('Booking Test', () => {
  let supplierToken;
  let userToken;
  let id;
  let roomId;
  let adminToken;
  const supplierData = { ...newSupplier, email: faker.internet.email() };
  before(async () => {
    const supplierResponse = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(supplierData);
    supplierToken = supplierResponse.body.data.signupToken;
    adminToken = supplierResponse.body.data.user.token;

    const userData = {
      ...newUser,
      email: faker.internet.email(),
      companyName: supplierData.companyName,
      signupToken: supplierToken
    };

    const userResponse = await chai
      .request(server)
      .post('/api/auth/signup/user')
      .send(userData);
    userToken = userResponse.body.data.token;
    id = userResponse.body.data.id;

    const roomResponse = await chai
      .request(server)
      .post('/api/facility/supplier')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(newFacility);
    roomId = roomResponse.body.data.rooms[0].id;
  });

  afterEach(() => sinon.restore());
  describe('Booking Route Endpoints', () => {
    it('should successfully create an accommodation booking', async () => {
      const booking = {
        checkIn: '2030-12-20',
        checkOut: '2030-12-30',
        userId: id,
        roomId
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(201);
      expect(response.body.data).to.be.a('object');
    });

    it('should fail validation if userId is not provided', async () => {
      const booking = {
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if userId is empty', async () => {
      const booking = {
        userId: '',
        roomId: 2,
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if userId is negative', async () => {
      const booking = {
        userId: -1,
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if roomId is not provided', async () => {
      const booking = {
        userId: 1,
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if roomId is empty', async () => {
      const booking = {
        userId: 1,
        roomId: '',
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if roomId is negative', async () => {
      const booking = {
        userId: 1,
        roomId: -1,
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if checkIn is not provided', async () => {
      const booking = {
        fullname: 'Miss Jane Smith',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if checkIn is in the past', async () => {
      const booking = {
        fullname: 'Miss Jane Smith',
        checkIn: '2019-09-04',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if wrong checkIn format is provided', async () => {
      const booking = {
        fullname: 'Miss Jane Smith',
        checkIn: '2019-13-04',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if checkIn is empty', async () => {
      const booking = {
        fullname: 'Miss Jane Smith',
        checkIn: '',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if checkOut is not provided', async () => {
      const booking = {
        fullname: 'Miss Jane Doe',
        checkIn: '2030-12-20'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if checkOut not larger than checkIn', async () => {
      const booking = {
        fullname: 'Miss Jane Doe',
        checkIn: '2030-12-20',
        checkOut: '2030-12-18'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if wrong checkOut format is provided', async () => {
      const booking = {
        fullname: 'Miss Jane Doe',
        checkIn: '2030-12-20',
        checkOut: '2030-13-04'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });

    it('should fail validation if checkOut is empty', async () => {
      const booking = {
        fullname: 'Miss Jane Doe',
        checkIn: '2030-12-20',
        checkOut: ''
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${userToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.a('string');
    });
  });

  describe('Booking Method', () => {
    it('fake sever error in accommodation booking controller', async () => {
      const req = {
        body: {}
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(req, 'body').throws();

      await BookingController.createAccBooking(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
