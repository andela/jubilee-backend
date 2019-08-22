import chai from 'chai';
import chaiHttp from 'chai-http';
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
        email: 'johndoe@yahoo.com',
        firstName: 'John',
        lastName: 'Doe',
        password: 'qwertyuiop1234',
        companyName: 'Andela',
        country: 'Nigeria',
        gender: 'male'
      };

      const response = await request.post('/api/auth/signup').send(user);
      expect(response.body.status).to.equal(201);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.token).to.be.a('string');
      expect(response.body.data.firstName).to.equal('John');
      expect(response.body.data.lastName).to.equal('Doe');
    });
  });
});
