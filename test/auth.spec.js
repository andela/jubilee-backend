import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../src';
import { newUser } from './dummies';
import Helpers from '../src/utils/helpers';

const { generateToken } = Helpers;

chai.use(chaiHttp);
let newlyCreatedUser = {};
let newUserPasswordReset;
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
      street: 'ajayi estate',
      city: faker.address.city(),
      state: faker.address.state(),
      birthdate: faker.date.past(),
      phoneNumber: faker.phone.phoneNumber()
    };

    const response = await chai
      .request(server)
      .post('/api/auth/userSignup')
      .send(user);
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.firstName).to.be.a('string');
    expect(response.body.data.lastName).to.be.a('string');
    newUserPasswordReset = user;
  });
  it("should send a verification link to a user's email upon successful registration", async () => {
    const response = await chai.request(server).post('/api/auth/userSignup').send(newUser);
    const { body: { data } } = response;
    newlyCreatedUser = { ...data };
    expect(response).to.have.status(201);
    expect(data.isVerified).to.equal(false);
    expect(data.emailSent).to.equal(true);
  });

  // my tests
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
      phoneNumber: '00000000000',
    };

    const response = await chai
      .request(server)
      .post('/api/auth/userSignup')
      .send(user);
    expect(response).to.has.status(201);
    expect(response.body).to.be.a('object');
    expect(response.body.status).to.equal('success');
  });
  it('should fail upon missing parameters during validation', async () => {
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
      phoneNumber: '00000000000',
    };

    const response = await chai
      .request(server)
      .post('/api/auth/userSignup')
      .send(user);
    expect(response).to.has.status(400);
    expect(response.body).to.be.a('object');
    expect(response.body.status).to.equal('fail');
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

    const response = await chai
      .request(server)
      .post('/api/auth/userSignup')
      .send(user);
    expect(response).to.has.status(409);
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.a('object');
    expect(response.body).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
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
    const { body: { error } } = response;
    expect(response).to.have.status(400);
    expect(error.message).to.equal('Invalid token, verification unsuccessful');
  });

  it('should return an error response if verification token is not valid', async () => {
    const response = await chai.request(server).get('/api/auth/verify?token=73783489d.eue4.78');
    const { body: { error } } = response;
    expect(response).to.have.status(400);
    expect(error.message).to.equal('Invalid token, verification unsuccessful');
  });

  it("should return an error response if the verification link contains details of a user that doesn't exist", async () => {
    const token = generateToken({ id: 49 });
    const response = await chai.request(server).get(`/api/auth/verify?token=${token}`);
    const { body: { error } } = response;
    expect(response).to.have.status(400);
    expect(error.message).to.equal('No user found to verify');
  });
  describe('Reset Password route', () => {
    it('should send an email containing reset password link with a status of 200', async () => {
      const user = {
        email: newUserPasswordReset.email
      };
      const response = await chai.request(server).post('/api/auth/reset-password/').send(user);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.a('string');
    });

    it('should throw error of 404, user email does not exist in database', async () => {
      const user = {
        email: faker.internet.email()
      };

      const response = await chai.request(server).post('/api/auth/reset-password/').send(user);
      expect(response).to.have.status(404);
      expect(response.error.message).to.be.a('string');
    });

    it('should return an error response if password reset link token is not valid', async () => {
      const response = await chai.request(server).get('/api/auth/reset-password?token=8767668');
      expect(response).to.have.status(500);
      expect(response.error.message).to.be.a('string');
    });

    it('should return an error response if password reset link token is not provided', async () => {
      const response = await chai.request(server).get('/api/auth/reset-password?token=');
      expect(response).to.have.status(500);
      expect(response.error.message).to.be.a('string');
    });

    it('should successfully verify the password reset link', async () => {
      const { id, firstName, email } = newUserPasswordReset;
      const token = generateToken({ id, firstName, email });
      const response = await chai.request(server).get(`/api/auth/reset-password?token=${token}`);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.a('string');
    });

    it('should return an error of 400, the password does not match', async () => {
      const testPassword = faker.internet.password(15, false);
      const password = {
        password: testPassword,
        confirmPassword: faker.internet.password(15, false)
      };

      const response = await chai.request(server).post(`/api/auth/password/reset/${newUserPasswordReset.email}`).send(password);
      expect(response).to.have.status(400);
      expect(response.error.message).to.be.a('string');
    });

    it('should return an error of 404 when a user intentionally input a wrong email', async () => {
      const testPassword = faker.internet.password(15, false);
      const password = {
        password: testPassword,
        confirmPassword: testPassword
      };

      const response = await chai.request(server).post(`/api/auth/password/reset/${faker.internet.email()}`).send(password);
      expect(response).to.have.status(404);
      expect(response.error.message).to.be.a('string');
    });
    it('should reset user password successfully', async () => {
      const testPassword = faker.internet.password(15, false);
      const password = {
        password: testPassword,
        confirmPassword: testPassword
      };

      const response = await chai.request(server).post(`/api/auth/password/reset/${newUserPasswordReset.email}`).send(password);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.a('string');
    });
  });

  it('should sign in user if emaill is true', (done) => {
    chai.request(server)
      .get('/api/auth/rightSocial')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});
describe('POST /api/auth/login', () => {
  it('should signin successfully with a status of 200', async () => {
    const { email, password } = newUser;
    const login = {
      email,
      password,
    };

    const response = await chai.request(server).post('/api/auth/login').send(login);
    expect(response).to.have.status(200);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.firstName).to.be.a('string');
    expect(response.body.data.lastName).to.be.a('string');
  });

  it('should return 401 if password is invalid', async () => {
    const { email } = newlyCreatedUser;
    const login = {
      email,
      password: 'password',
    };
    const response = await chai.request(server).post('/api/auth/login').send(login);
    expect(response.body.status).to.equal('fail');
    expect(response).to.have.status(401);
    expect(response.body.error.message).to.be.equal('Invalid login details');
  });

  it('should return 401 error if user does not exist in the database', async () => {
    const login = {
      email: 'kylewalker123@yahoo.com',
      password: 'password'
    };
    const response = await chai.request(server).post('/api/auth/login').send(login);
    expect(response.body.status).to.equal('fail');
    expect(response.status).to.equal(401);
    expect(response.body.error.message).to.be.equal('Invalid login details');
  });
});

describe('GET /api/auth/logout', () => {
  it('should logout a user successfully', async () => {
    const response = await chai.request(server).get('/api/auth/logout').send();
    expect(response).to.have.status(200);
  });
});
