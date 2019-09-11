import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '..';
import {
  newCompanyUser, createCompanyFacility, newRequest, tripRequest
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
      await Request.create(newRequest);
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
      expect(response.body.data).to.be.a('object');
      expect(response.body).to.have.property('data');
    });

    it('should return validation error tripType is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, tripType: '' });
      expect(response).to.have.status(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('Please select a trip type');
    });

    it('should return validation error purpose is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, purpose: '' });
      expect(response).to.have.status(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('Please enter a valid purpose \n the field must not be empty and it must be more than 3 letters');
    });
    it('should return validation error origin is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, origin: '' });
      expect(response).to.have.status(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('Please enter a valid origin \n the field must not be empty and it must be more than 3 letters');
    });
    it('should return validation error destination is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, destination: '' });
      expect(response).to.have.status(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('Please enter a valid destination \n the field must not be empty and it must be more than 3 letters');
    });
    it('should return validation error departureDate is empty', async () => {
      const response = await chai
        .request(server).post('/api/trip/request').set('Cookie', `token=${adminToken};`)
        .send({ ...tripRequest, departureDate: '' });
      expect(response).to.have.status(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.equal('Please input a valid date format: yy-mm-dd');
    });
  });
});
