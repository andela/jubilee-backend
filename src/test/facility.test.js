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
import { FacilityController } from '../controllers';

chai.use(chaiHttp);
chai.use(sinonChai);
const [newCompanyAdmin, facilityData] = createCompanyFacility;


describe('Facility route endpoints', () => {
  let adminToken;
  const supplierData = { ...newSupplier, email: faker.internet.email() };
  before(async () => {
    const supplier = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(supplierData);
    adminToken = supplier.body.data.user.token;
  });
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
  describe('POST /api/facility/company', () => {
    adminToken = null;
    it('should enable a companyTravelAdmin or a companySuperAdmin to successfully create a facility', async () => {
      const adminSignUpResponse = await chai
        .request(server)
        .post('/api/auth/signup/company')
        .send(newCompanyAdmin);
      const { body: { data: { signupToken, admin } } } = adminSignUpResponse;
      newCompanyUser.signupToken = signupToken;
      adminToken = admin.token;
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(facilityData).set('Cookie', `token=${adminToken}`);
      expect(response).to.have.status(201);
      expect(response.body.data.facility).to.be.a('object');
      expect(response.body.data.facility.rooms).to.be.an('array');
      expect(response.body.data.facility.amenities).to.be.an('array');
    });
    it('should prevent a facility from being created with invalid field parameters', async () => {
      const invalidFacilityData = { ...facilityData };
      invalidFacilityData.name = 'w';
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(invalidFacilityData).set('Cookie', `token=${adminToken}`);
      expect(response).to.have.status(400);
      expect(response.body.error).to.be.a('object');
      expect(response.body.error.message).to.be.an('string');
      expect(response.body.error.message).to
        .eql('Please enter a valid name for your facility, It should be atleast 3 characters long');
      delete invalidFacilityData.name;
      const missingFieldResponse = await chai
        .request(server)
        .post('/api/facility/company')
        .send(invalidFacilityData).set('Cookie', `token=${adminToken}`);
      expect(missingFieldResponse).to.have.status(400);
      expect(missingFieldResponse.body.error).to.be.a('object');
      expect(missingFieldResponse.body.error.message).to.be.an('string');
    });
    it('should prevent an unautheticated user from creating a facility', async () => {
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(facilityData);
      expect(response).to.have.status(401);
      expect(response.body.error.message).to.be.a('string');
    });
    it('should prevent an unauthorized user from creating a facility', async () => {
      const companyUserSignUpResponse = await chai
        .request(server)
        .post('/api/auth/signup/user')
        .send(newCompanyUser);
      const { body: { data: { token } } } = companyUserSignUpResponse;
      const response = await chai
        .request(server)
        .post('/api/facility/company')
        .send(facilityData).set('Cookie', `token=${token}`);
      expect(response).to.have.status(403);
      expect(response.body.error.message).to.be.a('string');
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
      const stubbedMethod = sinon.stub(FacilityService, 'createFacility')
        .throws('Failed to create facility. Try again');
      await FacilityController.createCompanyFacility(req, res);
      expect(res.status).to.have.been.calledWith(500);
      expect(res.json).to.have.been.calledWith(errorResponse);
      if (stubbedMethod.restore) { stubbedMethod.restore(); }
    });
  });
});
