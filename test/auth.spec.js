import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../src';
<<<<<<< HEAD
import { newUser, newSupplier, newCompany } from './dummies';
=======
import { newUser, newCompany } from './dummies';
>>>>>>> feat(company-signup): add company signup controller and validation
import Helpers from '../src/utils/helpers';

const { generateToken } = Helpers;

chai.use(chaiHttp);
let newlyCreatedUser = {};
let newUserPasswordReset;
describe('Auth route endpoints', () => {
  it('should signup a user successfully with a status of 201', async () => {
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
    newUserPasswordReset = user;
  });

  it('should successfully signup a supplier with status 201', async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(newSupplier);
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.user.token).to.be.a('string');
    expect(response.body.data.user.firstName).to.be.a('string');
    expect(response.body.data.user.lastName).to.be.a('string');
  });

  it('should return validation error when supplied a wrong category of service id', async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send({ ...newSupplier, categoryOfServiceId: 5 });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid categoryOfServiceId');
  });

  it('should return validation error when supplied an empty email', async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send({ ...newSupplier, email: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid company email address');
  });

  it('should return an integrity error when supplied an existing user\'s email', async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(newSupplier);
    expect(response).to.have.status(409);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal(`User with email: "${newSupplier.email}" already exists`);
  });

  it("should send a verification link to a user's email upon successful registration", async () => {
    const response = await chai.request(server).post('/api/auth/signup/user').send(newUser);
    const { body: { data } } = response;
    newlyCreatedUser = { ...data };
    expect(response).to.have.status(201);
    expect(data.isVerified).to.equal(false);
    expect(data.emailSent).to.equal(true);
  });

  // my tests
  it('should pass upon successfull validation and assign default role', async () => {
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
      .post('/api/auth/signup/user')
      .send(user);
    expect(response).to.has.status(201);
    expect(response.body).to.be.a('object');
    expect(response.body.data.roleAssignment).to.be.a('object');
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
      .post('/api/auth/signup/user')
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
      .post('/api/auth/signup/user')
      .send(user);
    expect(response).to.has.status(409);
    expect(response.body.status).to.equal('fail');
    expect(response.body).to.be.a('object');
    expect(response.body).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });

  it('should signup a company and return status 201', async () => {
    const response = await chai.request(server).post('/api/auth/signup/company').send(newCompany);
    expect(response).to.have.status(201);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.a('object');
<<<<<<< HEAD
    expect(response.body.data.admin.token).to.be.a('string');
    expect(response.body.data.company.companyToken).to.be.a('string');
    expect(response.body.data.admin.firstName).to.be.a('string');
    expect(response.body.data.admin.lastName).to.be.a('string');
  });
  it('should return a conflict error 409 if admin already exists in database', async () => {
    const { email } = newCompany;
    const response = await chai.request(server).post('/api/auth/signup/company').send(newCompany);
    expect(response).to.have.status(409);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal(`Admin with email: "${email}" already exists for a company`);
  });
=======
    expect(response.body.data.company).to.exist(); 
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.firstName).to.be.a('string');
    expect(response.body.data.lastName).to.be.a('string'); 
  });

>>>>>>> feat(company-signup): add company signup controller and validation
  it('should return bad error 400 if a required field is missing', async () => {
    const response = await chai.request(server).post('/api/auth/signup/company').send({ ...newCompany, firstName: '' });
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid firstname \n the field must not be empty and it must be more than 2 letters');
  });
<<<<<<< HEAD
=======

  it('should return a conflict error 409 if admin already exists in database', async () => {
    const { email } = newCompany;
    const response = await chai.request(server).post('/api/auth/signup/company').send(newCompany);
    expect(response).to.have.status(409);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal(`Admin with email: "${email}" already exists`);
  });
>>>>>>> feat(company-signup): add company signup controller and validation
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

      const response = await chai.request(server)
        .post(`/api/auth/password/reset/${newUserPasswordReset.email}`)
        .send(password);
      expect(response).to.have.status(400);
      expect(response.error.message).to.be.a('string');
    });

    it('should return an error of 404 when a user intentionally input a wrong email', async () => {
      const testPassword = faker.internet.password(15, false);
      const password = {
        password: testPassword,
        confirmPassword: testPassword
      };

      const response = await chai.request(server)
        .post(`/api/auth/password/reset/${faker.internet.email()}`)
        .send(password);
      expect(response).to.have.status(404);
      expect(response.error.message).to.be.a('string');
    });
    it('should reset user password successfully', async () => {
      const testPassword = faker.internet.password(15, false);
      const password = {
        password: testPassword,
        confirmPassword: testPassword
      };

      const response = await chai.request(server)
        .post(`/api/auth/password/reset/${newUserPasswordReset.email}`)
        .send(password);
      expect(response).to.have.status(200);
      expect(response.body.data).to.be.a('string');
    });
  });

  it('should sign in user if emaill is true', async () => {
    const response = await chai.request(server)
      .get('/api/auth/rightSocial');
    expect(response).to.have.status(200);
  });

  it('should not be able to sign in user if email is false', async () => {
    const response = await chai.request(server)
      .get('/api/auth/wrongSocial');
    expect(response).to.have.status(403);
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


describe('PATCH /api/users/role', () => {
  it('should successfully update user role', async () => {
    const { id, firstName, role } = newlyCreatedUser;
    const token = generateToken({ id, firstName, role });
    const { email } = newUser;
    const userRole = {
      email,
      roleId: 1
    };
    const response = await chai
      .request(server).patch('/api/users/role')
      .set('Cookie', `token=${token};`)
      .send(userRole);
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.userId).to.be.a('number');
    expect(response.body.data.roleId).to.be.a('number');
  });

  it('should fail is user does not exist', async () => {
    const { id, firstName, role } = newlyCreatedUser;
    const token = generateToken({ id, firstName, role });
    const userRole = {
      email: 'daniel@gmail.com',
      roleId: 1
    };
    const response = await chai.request(server)
      .patch('/api/users/role')
      .set('Cookie', `token=${token};`)
      .send(userRole);
    expect(response.body.status).to.equal('fail');
    expect(response.status).to.equal(404);
    expect(response.body.error.message).to.be.equal('User account does not exist');
  });
});

describe('GET /api/auth/logout', () => {
  it('should logout a user successfully', async () => {
    const response = await chai.request(server).get('/api/auth/logout').send();
    expect(response).to.have.status(200);
  });
});
