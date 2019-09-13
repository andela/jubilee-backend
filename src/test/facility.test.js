import chai, { expect } from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '..';
import {
  createCompanyFacility, newCompanyUser, newSupplier, newFacility
} from './dummies';
import { FacilityService } from '../services';
import { FacilityController, AuthController } from '../controllers';

chai.use(chaiHttp);
chai.use(sinonChai);

const [newCompanyAdmin, facilityData] = createCompanyFacility;


describe('Facility route endpoints', () => {
  let adminToken;
  const supplierData = { ...newSupplier, email: faker.internet.email() };
  let adminSignUpResponse;
  let companyUserSignUpResponse;
  before(async () => {
    const reqSupplier = { body: { ...supplierData } };
    const reqCompany = { body: { ...newCompanyAdmin } };


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

    adminSignUpResponse = await AuthController.companySignUp(reqCompany, res);

    const { data: { signupToken } } = adminSignUpResponse;
    const reqUser = { body: { ...newCompanyUser, signupToken, roleId: 5 } };
    companyUserSignUpResponse = await AuthController.userSignup(reqUser, res);
    const supplier = await AuthController.supplierSignup(reqSupplier, res);
    adminToken = supplier.data.user.token;
  });
  afterEach(() => {
    sinon.restore();
  });
  describe('POST /api/facility/supplier', () => {
    it('should return an authentication error - 401', async () => {
      const response = await chai
        .request(server)
        .post('/api/facility/supplier')
        .send(newFacility);
      expect(response).to.have.status(401);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.have.property('message');
      expect(response.body.error.message).to.equal('Access denied, Token required');
    });
    it('should return a validation error - 400', async () => {
      const response = await chai
        .request(server)
        .post('/api/facility/supplier')
        .send({ ...newFacility, name: '' })
        .set('authorization', `Bearer ${adminToken}`);
      expect(response).to.have.status(400);
      expect(response.body.status).to.equal('fail');
      expect(response.body.error).to.have.property('message');
      expect(response.body.error.message).to.equal('Please enter a valid name for your facility, It should be atleast 3 characters long');
    });
    it('should successfully create a new facility - 201', async () => {
      const response = await chai
        .request(server)
        .post('/api/facility/supplier')
        .send(newFacility)
        .set('authorization', `Bearer ${adminToken}`);
      expect(response).to.have.status(201);
      expect(response.body.status).to.equal('success');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.a('object');
      expect(response.body.data).to.have.property('rooms');
      expect(response.body.data).to.have.property('amenities');
    });
  });
  describe('PATCH /api/facility/supplier/:supplierId/:roomId', () => {
    it('should successfully update a room category - 201', async () => {
      const response = await chai
        .request(server)
        .patch(`/api/facility/supplier/${2}/${3}`)
        .send({ roomStatus: 'unavailable' })
        .set('authorization', `Bearer ${adminToken}`);
      expect(response).to.have.status(201);
      expect(response.body.status).to.equal('success');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.a('object');
      expect(response.body.data).to.have.property('roomStatus');
    });
    it('should return error if room category does not exist - 404', async () => {
      const response = await chai
        .request(server)
        .patch(`/api/facility/supplier/${2}/${8}`)
        .send({ roomStatus: 'unavailable' })
        .set('authorization', `Bearer ${adminToken}`);
      expect(response).to.have.status(404);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error).to.have.property('message');
      expect(response.body.error.message)
        .to.equal('Room category not found');
    });
    it('should successfully update amenities of a facility- 201', async () => {
      const response = await chai
        .request(server)
        .patch(`/api/facility/supplier/${2}/`)
        .send({ amenities: [3, 6, 1] })
        .set('authorization', `Bearer ${adminToken}`);
      expect(response).to.have.status(201);
      expect(response.body.status).to.equal('success');
      expect(response.body).to.have.property('data');
      expect(response.body.data).to.be.a('object');
      expect(response.body.data).to.have.property('amenities');
      expect(response.body.data.amenities.length).to.eql(3);
    });
    it('should return an error if facility does not exist- 404', async () => {
      const response = await chai
        .request(server)
        .patch(`/api/facility/supplier/${30}/`)
        .send({ amenities: [3, 6, 1] })
        .set('authorization', `Bearer ${adminToken}`);
      expect(response).to.have.status(404);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error).to.have.property('message');
      expect(response.body.error.message)
        .to.equal('This facility does not exist');
    });
    it('should return an error if user does not have the required roles- 403', async () => {
      const { data: { token } } = companyUserSignUpResponse;
      const response = await chai
        .request(server)
        .patch(`/api/facility/supplier/${2}/`)
        .send({ amenities: [3, 6, 1] })
        .set('authorization', `Bearer ${token}`);
      expect(response).to.have.status(403);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error).to.have.property('message');
    });
  });
  describe('POST /api/facility/company', () => {
    adminToken = null;
    let invalidFacilityData = {};
    it('should enable a companyTravelAdmin or a companySuperAdmin to successfully create a facility', async () => {
      const { data: { admin } } = adminSignUpResponse;
      adminToken = admin.token;
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(facilityData).set('Cookie', `token=${adminToken}`);
      expect(response).to.have.status(201);
      expect(response.body.data.facility).to.be.a('object');
      expect(response.body.data.facility.rooms.length).to.eql(2);
      expect(response.body.data.facility.amenities.length).to.eql(5);
    });
    it('should prevent a facility from being created with invalid field parameters', async () => {
      invalidFacilityData = { ...facilityData, name: 'w' };
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(invalidFacilityData).set('Cookie', `token=${adminToken}`);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to
        .eql('Please enter a valid name for your facility, It should be atleast 3 characters long');
    });
    it('should prevent a facility from being created if some required fields are missing', async () => {
      delete invalidFacilityData.name;
      const missingFieldResponse = await chai
        .request(server)
        .post('/api/facility/company')
        .send(invalidFacilityData).set('Cookie', `token=${adminToken}`);
      expect(missingFieldResponse).to.have.status(400);
      expect(missingFieldResponse.body.error).to.be.a('object');
      expect(missingFieldResponse.body.error.message).to.be.eql('Please enter a valid name for your facility, It should be atleast 3 characters long');
    });
    it('should prevent an unautheticated user from creating a facility', async () => {
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(facilityData);
      expect(response).to.have.status(401);
      expect(response.body.error.message).to.be.eql('Access denied, Token required');
    });
    it('should prevent an unauthorized user from creating a facility', async () => {
      const { data: { token } } = companyUserSignUpResponse;
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(facilityData).set('Cookie', `token=${token}`);
      expect(response).to.have.status(403);
      expect(response.body.error.message).to.eql('You are an unauthorized user');
    });
    it('should return a 500 error response if something goes wrong while creating the facility', async () => {
      const req = { data: { id: 1 } };
      const mockResponse = () => {
        const res = {};
        res.status = sinon.stub().returns(res);
        res.json = sinon.stub().returns(res);
        return res;
      };
      const res = mockResponse();
      const errorResponse = {
        status: 'fail',
        error: {
          message: 'Some error occurred while processing your Request',
          errors: undefined
        }
      };
      sinon.stub(FacilityService, 'createFacility')
        .throws('Failed to create facility. Try again');
      await FacilityController.createCompanyFacility(req, res);
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(errorResponse);
    });
  });
});
