import chai from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import app from '../src/index';

chai.use(chaiHttp);

const { expect } = chai;
let request;

describe('Auth route', () => {
  before(() => {
    request = chai.request(app).keepOpen();
  });

  after(() => {
    request.close();
  });

  describe('Signup route', () => {
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

      const response = await request.post('/api/auth/signup').send(user);
      console.log('response', response);
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.token).to.be.a('string');
      expect(response.body.data.firstName).to.be.a('string');
      expect(response.body.data.lastName).to.be.a('string');
    });
  });
});
