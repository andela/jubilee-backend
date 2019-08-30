"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _faker = _interopRequireDefault(require("faker"));

var _index = _interopRequireDefault(require("../index"));

var _helpers = _interopRequireDefault(require("../utils/helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const {
  generateToken
} = _helpers.default;

_chai.default.use(_chaiHttp.default);

let newUserPasswordReset;
describe('Auth Route Endpoints', () => {
  // Remove and Paste Your Previous Test Here
  describe('Reset Password Route', () => {
    it('should send an email containing reset password link with a status of 200', async () => {
      const user = {
        email: newUserPasswordReset.email
      };
      const response = await _chai.default.request(_index.default).post('/api/auth/reset-password/').send(user);
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.a('string');
    });
    it('should throw error of 404, user email does not exist in database', async () => {
      const user = {
        email: _faker.default.internet.email()
      };
      const response = await _chai.default.request(_index.default).post('/api/auth/reset-password/').send(user);
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.error.message).to.be.a('string');
    });
    it('should return an error response if password reset link token is not valid', async () => {
      const response = await _chai.default.request(_index.default).get('/api/auth/reset-password?token=8767668');
      (0, _chai.expect)(response).to.have.status(500);
      (0, _chai.expect)(response.error.message).to.be.a('string');
    });
    it('should return an error response if password reset link token is not provided', async () => {
      const response = await _chai.default.request(_index.default).get('/api/auth/reset-password?token=');
      (0, _chai.expect)(response).to.have.status(500);
      (0, _chai.expect)(response.error.message).to.be.a('string');
    });
    it('should successfully verify the password reset link', async () => {
      const {
        id,
        firstName,
        email
      } = newUserPasswordReset;
      const token = generateToken({
        id,
        firstName,
        email
      });
      const response = await _chai.default.request(_index.default).get(`/api/auth/reset-password?token=${token}`);
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.a('string');
    });
    it('should return an error of 400, the password does not match', async () => {
      const testPassword = _faker.default.internet.password(15, false);

      const password = {
        password: testPassword,
        confirmPassword: _faker.default.internet.password(15, false)
      };
      const response = await _chai.default.request(_index.default).post(`/api/auth/password/reset/${newUserPasswordReset.email}`).send(password);
      (0, _chai.expect)(response).to.have.status(400);
      (0, _chai.expect)(response.error.message).to.be.a('string');
    });
    it('should return an error of 404 when a user intentionally input a wrong email', async () => {
      const testPassword = _faker.default.internet.password(15, false);

      const password = {
        password: testPassword,
        confirmPassword: testPassword
      };
      const response = await _chai.default.request(_index.default).post(`/api/auth/password/reset/${_faker.default.internet.email()}`).send(password);
      (0, _chai.expect)(response).to.have.status(404);
      (0, _chai.expect)(response.error.message).to.be.a('string');
    });
    it('should reset user password successfully', async () => {
      const testPassword = _faker.default.internet.password(15, false);

      const password = {
        password: testPassword,
        confirmPassword: testPassword
      };
      const response = await _chai.default.request(_index.default).post(`/api/auth/password/reset/${newUserPasswordReset.email}`).send(password);
      (0, _chai.expect)(response).to.have.status(200);
      (0, _chai.expect)(response.body.data).to.be.a('string');
    });
    it('should sign in user if emaill is true', done => {
      _chai.default.request(_index.default).get('/api/auth/rightSocial').end((err, res) => {
        (0, _chai.expect)(res).to.have.status(200);
        done();
      });
    });
  }); // Remove and Paste Your Previous Test Here
});