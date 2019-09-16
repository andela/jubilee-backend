import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '..';
import {
  newCompanyUser, createCompanyFacility, newRequest, tripRequest, returnTripRequest
} from './dummies';
import { AuthController, RequestController } from '../controllers';
import { RequestService } from '../services';
import db from '../models';

const { Request } = db;

const { companySignUp, userSignup } = AuthController;

chai.use(chaiHttp);
chai.use(sinonChai);

const [companyAdmin] = createCompanyFacility;

describe('Request route endpoints', () => {
  let adminToken;
  let companyAdminResponse;
  let requester;
  before(async () => {
    const reqCompany = { body: { ...companyAdmin, email: 'baystef@slack.com', companyName: 'paystack' } };

    const res = {
      status() {
        return this;
      },
      cookie() {
        return this;
      },
      json(obj) {
        return obj;
      }
    };

    companyAdminResponse = await companySignUp(reqCompany, res);
    const { data: { signupToken } } = companyAdminResponse;
    const reqUser = {
      body: {
        ...newCompanyUser, email: 'steve@google.com', signupToken, roleId: 5
      }
    };
    const companyUserResponse = await userSignup(reqUser, res);
    requester = companyUserResponse.data;
    adminToken = companyUserResponse.data.token;
  });
  afterEach(() => {
    sinon.restore();
  });

  describe('GET api/users/requests', () => {
    it('should return 404 for user with no request yet', async () => {
      const response = await chai.request(server).get('/api/users/requests').set('Cookie', `token=${adminToken}`);
      expect(response).to.have.status(404);
      expect(response.body.error.message).to.be.eql('You have made no request yet');
    });
    it('should return a 500 error if something goes wrong while getting the requests', async () => {
      const req = {
        body: {}
      };
      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        return res;
      };
      const res = mockResponse();
      sinon.stub(RequestService, 'getRequests').throws();
      await RequestController.getUserRequests(req, res);
      expect(res.status).to.have.been.calledWith(500);
    });
    it('should get a request successfuly', async () => {
      await Request.create({ ...newRequest, requesterId: requester.id });
      const response = await chai.request(server).get('/api/users/requests').set('Cookie', `token=${adminToken}`);
      expect(response).to.have.status(200);
      expect(response.body.status).to.equal('success');
    });
  });

  describe('Trip Request Endpoint', () => {
    it('should successfully create a one-way trip request', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send(tripRequest);
      expect(response).to.have.status(201);
      expect(response.body.data).to.include({
        nameAsOnPassport: 'Daniel Smith',
        gender: 'male',
        purpose: 'Official',
        origin: 'Abuja',
        destination: 'Lagos',
        departureDate: '2020-11-07T00:00:00.000Z',
        tripType: 'One-way',
      });
    });

    it('should return validation error tripType is invalid', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, tripType: 'kkhkh' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('"tripType" must be one of [One-way, Round-Trip, Multi-leg]');
    });

    it('should return validation error tripType is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, tripType: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('tripType should not be empty');
    });
    it('should return validation error gender is invalid', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, gender: 'kkhkh' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('"gender" must be one of [male, female]');
    });

    it('should return validation error gender is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, gender: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('gender should not be empty');
    });

    it('should return validation error purpose is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, purpose: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('purpose should not be empty');
    });
    it('should return validation error purpose is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, purpose: 'a' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('purpose must not be less than 3 letters');
    });
    it('should return validation error origin is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, origin: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('origin should not be empty');
    });
    it('should return validation error origin is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, origin: 'q' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('origin must not be less than 3 letters');
    });
    it('should return validation error destination is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, destination: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('destination should not be empty');
    });
    it('should return validation error destination is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, destination: 'q' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('destination must not be less than 3 letters');
    });
    it('should return validation error nameAsOnPassport is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, nameAsOnPassport: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('nameAsOnPassport should not be empty');
    });
    it('should return validation error nameAsOnPassport is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, nameAsOnPassport: 'q' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('nameAsOnPassport must not be less than 3 letters');
    });
    it('should return validation error departureDate is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, departureDate: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('departureDate should not be empty');
    });
    it('should return validation error returnDate is selected in a One-way Trip', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, returnDate: '2020-11-07' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('Return date is not required');
    });

    it('should successfully create a return trip request', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send(returnTripRequest);
      expect(response).to.have.status(201);
      expect(response.body.data).to.include({
        nameAsOnPassport: 'Daniel Smith',
        gender: 'male',
        purpose: 'Official',
        origin: 'Abuja',
        destination: 'Lagos',
        tripType: 'Round-Trip',
        departureDate: '2020-11-07T00:00:00.000Z',
        returnDate: '2020-11-07T00:00:00.000Z',
      });
    });
    it('should return validation error returnDate is not selected in a Round-Trip', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, returnDate: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('returnDate should not be empty');
    });
  });
});
