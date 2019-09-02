import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../index';
import { helpers } from '../utils';

const { generateToken } = helpers;

chai.use(chaiHttp);
let newUserPasswordReset;
describe('Auth Route Endpoints', () => {
  // Remove and Paste Your Previous Test Here
  describe('Reset Password Route', () => {
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
  // Remove and Paste Your Previous Test Here
});
