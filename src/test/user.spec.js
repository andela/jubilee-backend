import chai, { expect } from 'chai';
import faker from 'faker';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
let newlyCreatedUser;
let token;
describe('User Route Endpoints', () => {
  it('should signup successfully with a status of 201', async () => {
    const user = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      password: faker.internet.password(15, false),
      companyName: faker.company.companyName(),
      country: faker.address.country(),
      gender: 'male',
      street: 'ajayi estate',
      city: faker.address.city(),
      state: faker.address.state(),
      birthdate: faker.date.past(),
      phoneNumber: faker.phone.phoneNumber()
    };
    const response = await chai
      .request(server)
      .post('/api/auth/signup/user')
      .send(user);
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.firstName).to.be.a('string');
    expect(response.body.data.lastName).to.be.a('string');
    newlyCreatedUser = response.body.data;
    const returnToken = response.body.data.token;
    token = returnToken;
  });
});


describe('GET REQUESTS', () => {
  it('should successfully populate the user data on the profile with a status of 200', async () => {
    const { id } = newlyCreatedUser;
    const response = await chai.request(server).get(`/api/users/profile/${id}`)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(200);
    expect(status).to.equal('success');
  });
  it('should return error of 404, the user not found', async () => {
    const id = 2131121313;
    const response = await chai.request(server).get(`/api/users/profile/${id}`)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(401);
    expect(status).to.equal('fail');
  });
});

describe('EDIT REQUESTS', () => {
  it('should return error of 404, the user not found', async () => {
    const id = 2131121313;
    const response = await chai.request(server).get(`/api/users/profile/${id}`)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(401);
    expect(status).to.equal('fail');
  });
  it('should successfully populate the user data on the profile with a status of 200', async () => {
    const { id } = newlyCreatedUser;
    const response = await chai.request(server).get(`/api/users/profile/${id}/edit`)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(200);
    expect(status).to.equal('success');
  });
});

describe('PUT REQUESTS', () => {
  it('should return error of 404, the user not found', async () => {
    const id = 2131121313;
    const response = await chai.request(server).get(`/api/users/profile/${id}`)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(401);
    expect(status).to.equal('fail');
  });
  it('should update the user data successfully with a status of 200', async () => {
    const { id } = newlyCreatedUser;
    const user = {
      email: faker.internet.email(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      country: faker.address.country(),
      gender: 'male',
      street: 'ajayi estate',
      city: faker.address.city(),
      state: faker.address.state(),
      birthdate: faker.date.past(),
      phoneNumber: faker.phone.phoneNumber()
    };
    const response = await chai.request(server).put(`/api/users/profile/${id}/update`).send(user)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(200);
    expect(status).to.equal('success');
  });
});
