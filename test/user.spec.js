import '@babel/polyfill';
import chai from 'chai';
import chaiHttp from 'chai-http';
import database from '../src/models';
import Auth from '../src/utils/auth';
import app from '../src/index';

chai.use(chaiHttp);

const { expect } = chai;
let request;
const user = {
  firstName: 'Adebayo',
  lastName: 'Daramola',
  birthdate: '1986-09-21',
  preferredLanguage: 'EN',
  preferredCurrency: 'Naira',
  email: 'ade.steve@gmail.com',
  gender: 'Male',
  street: 'Backstreet',
  city: 'Ilupeju',
  state: 'Lagos',
  country: 'Nigeria',
  zip: '100001',
  phoneNo: '2347080445678',
  companyName: 'Andela',
  password: Auth.hash('testing'),
  company: 'Andela',
  role: 'Senior',
  isVerified: false,
  facebookId: 'Nil',
  googleId: 'Nil',
  department: 'admin',
  lineManager: 'Lati',
  createdAt: new Date(),
  updatedAt: new Date()
};

beforeEach(() => {
  request = chai.request(app);
});

describe('Auth route', () => {
  before(async () => {
    await database.sequelize.sync({ force: true });
  });

  after(async () => {
    await database.sequelize.drop();
    await database.sequelize.sync();
  });

  describe('Signin route', () => {
    it('should signin successfully with a status of 200', async () => {
      await database.User.create(user);
      const login = {
        email: 'ade.steve@gmail.com',
        password: 'testing',
      };

      const response = await request.post('/api/auth/login').send(login);
      expect(response.body.status).to.equal(200);
      expect(response.body.data).to.be.a('object');
      expect(response.body.data.token).to.be.a('string');
      expect(response.body.data.firstName).to.be.a('string');
      expect(response.body.data.lastName).to.be.a('string');
    });
  });
});
