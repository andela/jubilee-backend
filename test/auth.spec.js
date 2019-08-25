import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../src';
import { newUser } from './dummies';
import Helpers from '../src/utils/helpers';

const { generateToken } = Helpers;

chai.use(chaiHttp);

let newlyCreatedUser = {};
describe('Auth route endpoints', () => {
  it('should signup successfully with a status of 201', async () => {
    const user = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(15, false),
      companyName: faker.company.companyName(),
      country: faker.address.country(),
      gender: 'male',
      street: faker.address.streetAddress(),
      city: faker.address.city(),
      state: faker.address.state(),
      birthdate: faker.date.past(),
      phoneNumber: faker.phone.phoneNumber()
    };

    const response = await chai
      .request(server)
      .post('/api/auth/signup')
      .send(user);
    expect(response.body.status).to.equal(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.firstName).to.be.a('string');
    expect(response.body.data.lastName).to.be.a('string');
  });
  it("should send a verification link to a user's email upon successful registration", async () => {
    const response = await chai.request(server).post('/api/auth/signup').send(newUser);
    const { body: { data } } = response;
    newlyCreatedUser = { ...data };
    expect(response).to.have.status(201);
    expect(data.isVerified).to.equal(false);
    expect(data.emailSent).to.equal(true);
  });

  it('should return a response that indicates verification link was not sent whenever a mail is not sent upon successful registration', async () => {
    const user2 = { ...newUser };
    user2.email = 'notvalid';
    const response = await chai.request(server).post('/api/auth/signup').send(user2);
    const { body: { data } } = response;
    newlyCreatedUser = { ...data };
    expect(response).to.have.status(201);
    expect(data.isVerified).to.equal(false);
    expect(data.emailSent).to.equal(false);
  });
});
describe('GET /api/auth/verify?token', () => {
  it('should successfully verify an existing user if the token is valid', async () => {
    const { id, firstName, role } = newlyCreatedUser;
    const token = generateToken({ id, firstName, role });
    const response = await chai.request(server).get(`/api/auth/verify?token=${token}`);
    const { body: { data: { isVerified } } } = response;
    expect(response).to.have.status(200);
    expect(isVerified).to.equal(true);
  });

  it('should return an error response if verification token is not provided', async () => {
    const response = await chai.request(server).get('/api/auth/verify?token=');
    const { body: { message } } = response;
    expect(response).to.have.status(400);
    expect(message).to.equal('Invalid token, verification unsuccessful');
  });

  it('should return an error response if verification token is not valid', async () => {
    const response = await chai.request(server).get('/api/auth/verify?token=73783489d.eue4.78');
    const { body: { message } } = response;
    expect(response).to.have.status(400);
    expect(message).to.equal('Invalid token, verification unsuccessful');
  });

  it("should return an error response if the verification link contains details of a user that doesn't exist", async () => {
    const token = generateToken({ id: 49 });
    const response = await chai.request(server).get(`/api/auth/verify?token=${token}`);
    const { body: { message } } = response;
    expect(response).to.have.status(400);
    expect(message).to.equal('no user found to verify');
  });
});
