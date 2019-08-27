import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../src/index';
import { helpers } from '../src/utils';
import database from '../src/models';

chai.use(chaiHttp);
console.log(process.env.NODE_ENV);
const { expect } = chai;
let request;

describe('Auth route', () => {
  before(async () => {
    request = chai.request(app).keepOpen();
    await database.sequelize.sync({ force: true });
  });

  after(async () => {
    await database.sequelize.drop();
    await database.sequelize.sync();
    request.close();
  });

  const user = {
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    password: helpers.hashPassword(faker.internet.password(15, false)),
    companyName: faker.company.companyName(),
    country: faker.address.country(),
    gender: 'male',
    street: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    birthdate: faker.date.past(),
    phoneNumber: faker.phone.phoneNumber()
  };

  describe('Signup route', () => {
    it('should signup successfully with a status of 201', async () => {
      const response = await request.post('/api/auth/signup').send(user);
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.token).to.be.a('string');
      expect(response.body.data.firstName).to.be.a('string');
      expect(response.body.data.lastName).to.be.a('string');
    });
  });

  describe('Login route', () => {
    it('should signin successfully with a status of 200', async () => {
      const login = {
        email: user.email,
        password: user.password,
      };
      const response = await request.post('/api/auth/login').send(login);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.token).to.be.a('string');
      expect(response.body.data.firstName).to.be.a('string');
      expect(response.body.data.lastName).to.be.a('string');
    });

    it('should return 401 if password is invalid', async () => {
      const login = {
        email: user.email,
        password: 'wrong',
      };
      const response = await request.post('/api/auth/login').send(login);
      expect(response.body.status).to.equal(401);
      expect(response.body.message).to.be.equal('Invalid login details');
    });

    it('should return 401 error if login details is invalid', async () => {
      const login = {
        email: 'kylewalker123@yahoo.com',
        password: 'password'
      };
      const response = await request.post('/api/auth/login').send(login);
      expect(response.body.status).to.equal(401);
      expect(response.body.message).to.be.equal('Invalid login details');
    });
  });
});
