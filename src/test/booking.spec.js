import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import faker from 'faker';
import server from '../index';
import { BookingController } from '../controllers';
import { BookingMiddleware } from '../middlewares';
import { BookingValidator } from '../validation';

chai.use(chaiHttp);
chai.use(sinonChai);

let supplierToken;
let userToken;
let id;

describe('Booking Test', () => {
  before(async () => {
    const newSupplier = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      companyName: 'Andela',
      companyAddress: faker.address.secondaryAddress(),
      categoryOfServiceId: 2,
      password: faker.internet.password(15, false),
      phoneNumber: faker.phone.phoneNumber()
    };

    const supplierResponse = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(newSupplier);
    supplierToken = supplierResponse.body.data.signupToken;

    const user = {
      firstName: 'Azeez',
      lastName: 'kings',
      email: 'azking@gmail.com',
      password: 'tmobnvarq.ss66u',
      companyName: newSupplier.companyName,
      signupToken: supplierToken
    };

    const userResponse = await chai
      .request(server)
      .post('/api/auth/signup/user')
      .send(user);
    userToken = userResponse.body.data.token;
    id = userResponse.body.data.id;
  });

  afterEach(() => sinon.restore());
  describe('Booking Route Endpoints', () => {
    it('should successfully create an accommodation booking', async () => {
      const booking = {
        checkIn: '2030-12-20',
        checkOut: '2030-12-30',
        userId: id,
        roomId: 1
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', userToken)
        .send(booking);
      expect(response).to.have.status(201);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.fullname).to.be.a('string');
    });

    it('should fail validation if userId is not provided', async () => {
      const booking = {
        checkIn: '2030-12-20',
        checkOut: '2030-12-30'
      };

      const response = await chai
        .request(server)
        .post('/api/booking/accommodation')
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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
        .set('Authorization', userToken)
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

    it('fake sever error in accommodation booking middleware', async () => {
      const req = {
        body: {}
      };
      const res = {
        status() {},
        json() {}
      };

      sinon.stub(res, 'status').returnsThis();
      sinon.stub(BookingValidator, 'validateAccommodation').throws();

      await BookingMiddleware.validateFields(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
  });
});
