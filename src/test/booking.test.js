import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import server from '../index';
import { BookingController, AuthController } from '../controllers';
import { newSupplier, newFacility } from './dummies';

chai.use(chaiHttp);
chai.use(sinonChai);

const { supplierSignup } = AuthController;

describe('Booking Test', () => {
  let roomId;
  let adminToken;
  before(async () => {
    const supplierData = { ...newSupplier, email: faker.internet.email() };
    const supReq = {
      body: { ...supplierData }
    };

    const res = {
      cookie() { return this; },
      status() { return this; },
      json(obj) { return obj; }
    };

    const supplierResponse = await supplierSignup(supReq, res);
    adminToken = supplierResponse.data.user.token;

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
        userId: 1,
        roomId
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(201);
      expect(response.body.data).to.include({
        checkIn: '2030-12-20',
        checkOut: '2030-12-30',
        userId: 1
      });
    });

    it('should fail validation if userId is not provided', async () => {
      const booking = {
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('userId is required!');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('userId should not be empty');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('userId must be a positive number');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('roomId is required!');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('roomId should not be empty');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('roomId must be a positive number');
    });

    it('should fail validation if checkIn is not provided', async () => {
      const booking = {
        fullname: 'Miss Jane Smith',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkIn is required!');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkIn must be larger than or equal to today');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkIn should be in this format YYYY-MM-DD');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkIn should not be empty');
    });

    it('should fail validation if checkOut is not provided', async () => {
      const booking = {
        fullname: 'Miss Jane Doe',
        checkIn: '2030-12-20'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkOut is required!');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkOut must be larger than or equal to checkIn');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkOut should be in this format YYYY-MM-DD');
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
        .set('Authorization', `Bearer ${adminToken}`)
        .send(booking);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('checkOut should not be empty');
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
