import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '..';
import {
  newCompanyUser, createCompanyFacility, newRequest, newTestCompany, tripRequest
} from './dummies';
import { AuthController, RequestController } from '../controllers';
import { RequestService } from '../services';
import db from '../models';

const { Request } = db;

const { companySignUp, userSignup } = AuthController;

chai.use(chaiHttp);
chai.use(sinonChai);

let newlyCreatedCompany;
let newlyCreatedUser;
let newlyCreatedRequest;
let companyAdminToken;
let userToken;

const [companyAdmin] = createCompanyFacility;

describe('User Route Endpoints', () => {
  it('should signup a company and return status 201', async () => {
    const response = await chai.request(server).post('/api/auth/signup/company').send(newTestCompany);
    newlyCreatedCompany = response.body.data;
    companyAdminToken = newlyCreatedCompany.admin.token;
    expect(response).to.have.status(201);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.a('object');
  });


  it('should signup user successfully with a status of 201', async () => {
    const user = {
      email: 'bolamark@user.com',
      firstName: 'bola',
      lastName: 'Mark',
      password: 'tmobnvarq.ss66u',
      companyName: newlyCreatedCompany.company.companyName,
      signupToken: newlyCreatedCompany.signupToken,
    };
    const response = await chai
      .request(server)
      .post('/api/auth/signup/user')
      .send(user);
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    newlyCreatedUser = response.body.data;
    userToken = newlyCreatedUser.token;
  });
});

describe('Request Endpoints', () => {
  it('should create request successfully with a status of 201', async () => {
    const request = {
      requesterId: newlyCreatedUser.id,
      managerId: newlyCreatedCompany.admin.id,
      purpose: 'official',
      statusId: 2,
      tripType: 'Round-Trip',
      origin: 'lagos',
      destination: 'Lagos',
      departureDate: new Date(),
      returnDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const response = await Request.create(request);
    newlyCreatedRequest = response.dataValues;
  });
  it('should get request by id in token and param status', async () => {
    const response = await chai
      .request(server)
      .get(`/api/users/requests/${newlyCreatedRequest.statusId}`)
      .set('Cookie', `token=${companyAdminToken}`);
    expect(response).to.have.status(200);
    expect(response.body.status).to.equal('success');
  });

  it('should throw error if wrong status param is passed', async () => {
    const response = await chai
      .request(server)
      .get('/api/users/requests/5')
      .set('Cookie', `token=${companyAdminToken}`);
    expect(response).to.have.status(400);
    expect(response.body.error.message).to.equal('Request statusId can only be values 1, 2, 3 - approved, pending, rejected');
  });

  const newlyRequest = { statusId: 1 };

  it('should update request by request id in params', async () => {
    const response = await chai
      .request(server)
      .patch(`/api/users/requests/${newlyCreatedRequest.id}`)
      .set('Cookie', `token=${companyAdminToken};`)
      .send(newlyRequest);
    expect(response).to.have.status(200);
    expect(response.body.status).to.equal('success');
  });

  it('should throw error if wrong requestId is specified', async () => {
    const response = await chai
      .request(server)
      .patch('/api/users/requests/hh')
      .set('Cookie', `token=${companyAdminToken};`)
      .send(newlyRequest);
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error.message).to.equal('Request Id can only be a number');
  });

  const wrongRequest = { statusId: '6' };

  it('should throw error if wrong status update is specified', async () => {
    const response = await chai
      .request(server)
      .patch(`/api/users/requests/${newlyCreatedRequest.id}`)
      .set('Cookie', `token=${companyAdminToken};`)
      .send(wrongRequest);
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error.message).to.equal('Request statusId can only be values 1, 2, 3 - approved, pending, rejected');
  });

  it('should throw error if wrong request id is specified', async () => {
    const response = await chai
      .request(server)
      .patch('/api/users/requests/1234')
      .set('Cookie', `token=${companyAdminToken};`)
      .send(newlyRequest);
    expect(response).to.have.status(404);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error.message).to.equal('updateRequest: No such request');
  });
});


describe('Request route endpoints', () => {
  let adminToken;
  let companyAdminResponse;

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
      const newlyRequest = {
        ...newRequest,
        managerId: newlyCreatedCompany.admin.id,
        requesterId: newlyCreatedUser.id
      };
      await Request.create(newlyRequest);
      const response = await chai.request(server).get('/api/users/requests').set('Cookie', `token=${userToken}`);
      expect(response).to.have.status(200);
      expect(response.body.status).to.equal('success');
    });
  });

  describe('Trip Request Endpoint', () => {
    let newlyTripRequest;
    before(async () => {
      newlyTripRequest = {
        ...tripRequest,
        managerId: newlyCreatedCompany.admin.id,
      };
    });
    it('should successfully create a one-way trip request', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send(newlyTripRequest);
      expect(response).to.have.status(201);
      expect(response.body.data).to.include({
        purpose: 'Official',
        origin: 'Abuja',
        destination: 'Lagos',
        departureDate: '2020-11-07T00:00:00.000Z'
      });
    });

    it('should return validation error tripType is invalid', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, tripType: 'kkhkh' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('"tripType" must be one of [One-way, Round-Trip, Multi-leg]');
    });

    it('should return validation error tripType is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, tripType: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('tripType should not be empty');
    });

    it('should return validation error purpose is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, purpose: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('purpose should not be empty');
    });
    it('should return validation error purpose is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, purpose: 'a' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('purpose must not be less than 3 letters');
    });
    it('should return validation error origin is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, origin: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('origin should not be empty');
    });
    it('should return validation error origin is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, origin: 'q' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('origin must not be less than 3 letters');
    });
    it('should return validation error destination is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, destination: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('destination should not be empty');
    });
    it('should return validation error destination is less than 3 characters', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, destination: 'q' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('destination must not be less than 3 letters');
    });
    it('should return validation error departureDate is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...newlyTripRequest, departureDate: '' });
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('departureDate should not be empty');
    });
  });
});
