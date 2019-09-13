import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '..';
import { newUser, newSupplier, newCompany } from './dummies';
import Helpers from '../utils/helpers';

const { generateToken } = Helpers;

chai.use(chaiHttp);
let newlyCreatedUser;
let newUserPasswordReset;
let supplierToken;
let companyToken;
let supplierAdminToken;
describe('Auth route endpoints', () => {
  it('should successfully signup a supplier with status 201', async () => {
    const response = await chai
      .request(server)
      .post('/api/auth/signup/supplier')
      .send(newSupplier);
    supplierToken = response.body.data.signupToken;
    supplierAdminToken = response.body.data.user.token;
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.user.token).to.be.a('string');
    expect(response.body.data.user.firstName).to.be.a('string');
    expect(response.body.data.user.lastName).to.be.a('string');
  });

  it('should signup a user successfully with a status of 201', async () => {
    const user = {
      firstName: 'Davis',
      lastName: 'Okra',
      email: 'Davis@okra.com',
      password: 'tmobnvarq.ss66u',
      companyName: newSupplier.companyName,
      signupToken: supplierToken,
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
    expect(response.body.error.message).to.equal(`User with email: "${newSupplier.email}" already exists for a supplier`);
  });

  it("should send a verification link to a user's email upon successful registration", async () => {
    newUser.companyName = newSupplier.companyName;
    newUser.signupToken = supplierToken;
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
      firstName: 'Kaniri',
      lastName: 'ODunsi',
      email: 'kaniri@gmail.com',
      password: 'tmobnvarq.ss66u',
      companyName: newSupplier.companyName,
      signupToken: supplierToken,
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
      firstName: 'Kaniri',
      lastName: 'ODunsi',
      email: 'kaniri@gmail.com',
      password: 'tmobnvarq.ss66u',
      companyName: newSupplier.companyName,
      signupToken: supplierToken,
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
    companyToken = response.body.data.signupToken;
    expect(response).to.have.status(201);
    expect(response.body.status).to.equal('success');
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.admin.token).to.be.a('string');
    expect(response.body.data.company.companyToken).to.be.a('string');
    expect(response.body.data.admin.firstName).to.be.a('string');
    expect(response.body.data.admin.lastName).to.be.a('string');
  });

  it('should signup a company user successfully with a status of 201', async () => {
    const user = {
      firstName: 'brimo',
      lastName: 'Okra',
      email: 'brimo@okra.com',
      password: 'tmobnvarq.ss66u',
      companyName: newCompany.companyName,
      signupToken: companyToken,
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

  it('should return a conflict error 409 if admin already exists in database', async () => {
    const { email } = newCompany;
    const response = await chai.request(server).post('/api/auth/signup/company').send(newCompany);
    expect(response).to.have.status(409);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal(`User with email: "${email}" already exists for a company`);
  });

  it('should return an error response if verification token is not provided', async () => {
    const response = await chai.request(server).get('/api/auth/verify?token=');
    const { body: { error } } = response;
    expect(response).to.have.status(400);
    expect(error.message).to.equal('Invalid token, verification unsuccessful');
  });
  it('should return bad error 400 if a required field is missing', async () => {
    const response = await chai.request(server).post('/api/auth/signup/company').send({ ...newCompany, firstName: '' });
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid firstname \n the field must not be empty and it must be more than 2 letters');
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
    expect(response).to.have.status(401);
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
      password: 'passworD26',
    };
    const response = await chai.request(server).post('/api/auth/login').send(login);
    expect(response.body.status).to.equal('fail');
    expect(response).to.have.status(401);
    expect(response.body.error.message).to.be.equal('Invalid login details');
  });

  it('should return 401 error if user does not exist in the database', async () => {
    const login = {
      email: 'kylewalker123@yahoo.com',
      password: 'passworD56'
    };
    const response = await chai.request(server).post('/api/auth/login').send(login);
    expect(response.body.status).to.equal('fail');
    expect(response.status).to.equal(401);
    expect(response.body.error.message).to.be.equal('Invalid login details');
  });
});


describe('PATCH /api/users/role', () => {
  it('should successfully update user role', async () => {
    const { email } = newUser;
    const userRole = {
      email,
      roleId: 1
    };
    const response = await chai
      .request(server).patch('/api/users/role')
      .set('Cookie', `token=${supplierAdminToken};`)
      .send(userRole);
    expect(response).to.have.status(200);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.userId).to.be.a('number');
    expect(response.body.data.roleId).to.be.a('number');
  });

  it('should fail if user does not exist', async () => {
    const userRole = {
      email: 'daniel@gmail.com',
      roleId: 1
    };
    const response = await chai.request(server)
      .patch('/api/users/role')
      .set('Cookie', `token=${supplierAdminToken}`)
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
