import chai, { expect } from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import server from '../index';
import { newSupplier, newFacility, newUser } from './dummies';

chai.use(chaiHttp);
describe('Facility endpoint', () => {
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
});
