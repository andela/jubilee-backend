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
      password: 'Elijahayodele12',
      companyName: faker.company.companyName(),
      companyAddress: faker.address.secondaryAddress(),
      categoryOfServiceId: 2,
      phoneNumber: faker.phone.phoneNumber()
    };
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(user);
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.user.token).to.be.a('string');
    expect(response.body.data.user.firstName).to.be.a('string');
    expect(response.body.data.user.lastName).to.be.a('string');
    newlyCreatedUser = response.body.data.user;
    token = response.body.data.user.token;
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
  it('should return error of 401, access denied', async () => {
    const id = 2131121313;
    const response = await chai.request(server).get(`/api/users/profile/${id}`)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(401);
    expect(status).to.equal('fail');
  });
});

describe('PUT REQUESTS', () => {
  it('should return error of 401, access denied', async () => {
    const id = 2131121313;
    const response = await chai.request(server).put(`/api/users/profile/${id}`)
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
    const response = await chai.request(server).put(`/api/users/profile/${id}`).send(user)
      .set('authorization', `Bearer ${token}`);
    const { body: { status } } = response;
    expect(response).to.have.status(200);
    expect(status).to.equal('success');
  });
});

describe('GET /users/requests', () => {
  it('should return 404 for user with no request yet', async () => {
    const response = await chai.request(server).get('/api/users/requests').set('Cookie', `token=${token}`);
    expect(response).to.have.status(404);
  });
});

describe('POST /users/request/stats', () => {
  it('should successfully return the number of trip request count', async () => {
    const dataObj = {
      startDate: Date.now(),
      endDate: Date.now()
    };
    const response = await chai.request(server).post('/api/users/request/stats').send(dataObj)
      .set('Cookie', `token=${token}`);
    const { body: { status, data } } = response;
    expect(response).to.have.status(200);
    expect(status).to.equal('success');
    expect(data).to.be.a('number');
  });
  it('should return 400 error for invalid date input', async () => {
    const dataObj = {
      startDate: '2019-09-16',
      endDate: '2019-09'
    };
    const response = await chai.request(server).post('/api/users/request/stats').send(dataObj)
      .set('Cookie', `token=${token}`);
    const { body: { status, error } } = response;
    expect(response).to.have.status(400);
    expect(status).to.equal('fail');
    expect(error.message).to.be.a('string');
  });
});
