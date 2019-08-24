import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../src/index';
import database from '../src/models';

chai.use(chaiHttp);

const { expect } = chai;
let request,
    email;

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

  describe('Signup route', () => {
    it('should pass upon successfull validation', async () => {
      const user = {
        email: 'tony@gmail.com',
        firstName: 'Tony',
        lastName: 'Marshall',
        password: 'tmonarqA1.',
        companyName: 'Jubilee',
        country: 'NIgeria',
        gender: 'male',
        street: 'Abage',
        city: 'Lagos',
        state: 'Imo',
        birthdate: '2019-08-20',
        phoneNumber: faker.phone.phoneNumber(),
      };

      const response = await request.post('/api/auth/signup').send(user);
      // NOTE: logging response body for testing. Will be removed dduring production
      expect(response).to.has.status(201);
      expect(response.body).to.be.a('object');
      expect(response.body.status).to.equal(201);
    });

    it('should fail validation if parameters are incomplete', async () => {
      const user = {
        firstName: 'Tony',
        lastName: 'Marshall',
        password: 'tmonarqA1.',
        companyName: 'Jubilee',
        country: 'NIgeria',
        gender: 'male',
        street: 'Abage',
        city: 'Lagos',
        state: 'Imo',
        birthdate: '2019-08-20',
        phoneNumber: faker.phone.phoneNumber(),
      };

      const response = await request.post('/api/auth/signup').send(user);
      // NOTE: logging response body for testing. Will be removed dduring production
      expect(response).to.has.status(400);
      expect(response.body.status).to.equal(400);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.be.a('string');
    });
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
        phoneNumber: faker.phone.phoneNumber(),
      };

      const response = await request.post('/api/auth/signup').send(user);
      // NOTE: logging response body for testing. Will be removed dduring production
      console.log(response.body);
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.token).to.be.a('string');
      expect(response.body.data.firstName).to.be.a('string');
      expect(response.body.data.lastName).to.be.a('string');
    });

    it('should fail upon signup if user exists', async () => {
      const user = {
        email: 'tony@gmail.com',
        firstName: 'Tony',
        lastName: 'Marshall',
        password: 'tmonarqA1.',
        companyName: 'Jubilee',
        country: 'NIgeria',
        gender: 'male',
        street: 'Abage',
        city: 'Lagos',
        state: 'Imo',
        birthdate: '2019-08-20',
        phoneNumber: faker.phone.phoneNumber(),
      };

      const response = await request.post('/api/auth/signup').send(user);
      // NOTE: logging response body for testing. Will be removed dduring production
      console.log(response.body);
      expect(response).to.has.status(409);
      expect(response.body.status).to.equal(409);
      expect(response.body).to.be.a('object');
      expect(response.body).to.be.a('object');
      expect(response.body.message).to.be.a('string');
    });
  });
});
