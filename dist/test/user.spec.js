"use strict";

var _chai = _interopRequireWildcard(require("chai"));

var _faker = _interopRequireDefault(require("faker"));

var _chaiHttp = _interopRequireDefault(require("chai-http"));

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

_chai.default.use(_chaiHttp.default);

let newlyCreatedUser;
let token;
describe('User Route Endpoints', () => {
  it('should signup successfully with a status of 201', async () => {
    const user = {
      email: _faker.default.internet.email(),
      firstName: _faker.default.name.firstName(),
      lastName: _faker.default.name.lastName(),
      password: _faker.default.internet.password(15, false),
      companyName: _faker.default.company.companyName(),
      country: _faker.default.address.country(),
      gender: 'male',
      street: 'ajayi estate',
      city: _faker.default.address.city(),
      state: _faker.default.address.state(),
      birthdate: _faker.default.date.past(),
      phoneNumber: _faker.default.phone.phoneNumber()
    };
    const response = await _chai.default.request(_index.default).post('/api/auth/signup/user').send(user);
    (0, _chai.expect)(response).to.have.status(201);
    (0, _chai.expect)(response.body.data).to.be.a('object');
    (0, _chai.expect)(response.body.data.token).to.be.a('string');
    (0, _chai.expect)(response.body.data.firstName).to.be.a('string');
    (0, _chai.expect)(response.body.data.lastName).to.be.a('string');
    newlyCreatedUser = response.body.data;
    token = response.body.data.token;
  });
});
describe('GET REQUESTS', () => {
  it('should successfully populate the user data on the profile with a status of 200', async () => {
    const {
      id
    } = newlyCreatedUser;
    const response = await _chai.default.request(_index.default).get(`/api/users/profile/${id}`).set('authorization', `Bearer ${token}`);
    const {
      body: {
        status
      }
    } = response;
    (0, _chai.expect)(response).to.have.status(200);
    (0, _chai.expect)(status).to.equal('success');
  });
  it('should return error of 404, the user not found', async () => {
    const id = 2131121313;
    const response = await _chai.default.request(_index.default).get(`/api/users/profile/${id}`).set('authorization', `Bearer ${token}`);
    const {
      body: {
        status
      }
    } = response;
    (0, _chai.expect)(response).to.have.status(401);
    (0, _chai.expect)(status).to.equal('fail');
  });
});
describe('EDIT REQUESTS', () => {
  it('should return error of 404, the user not found', async () => {
    const id = 2131121313;
    const response = await _chai.default.request(_index.default).get(`/api/users/profile/${id}`).set('authorization', `Bearer ${token}`);
    const {
      body: {
        status
      }
    } = response;
    (0, _chai.expect)(response).to.have.status(401);
    (0, _chai.expect)(status).to.equal('fail');
  });
  it('should successfully populate the user data on the profile with a status of 200', async () => {
    const {
      id
    } = newlyCreatedUser;
    const response = await _chai.default.request(_index.default).get(`/api/users/profile/${id}/edit`).set('authorization', `Bearer ${token}`);
    const {
      body: {
        status
      }
    } = response;
    (0, _chai.expect)(response).to.have.status(200);
    (0, _chai.expect)(status).to.equal('success');
  });
});
describe('PUT REQUESTS', () => {
  it('should return error of 404, the user not found', async () => {
    const id = 2131121313;
    const response = await _chai.default.request(_index.default).get(`/api/users/profile/${id}`).set('authorization', `Bearer ${token}`);
    const {
      body: {
        status
      }
    } = response;
    (0, _chai.expect)(response).to.have.status(401);
    (0, _chai.expect)(status).to.equal('fail');
  });
  it('should update the user data successfully with a status of 200', async () => {
    const {
      id
    } = newlyCreatedUser;
    const user = {
      email: _faker.default.internet.email(),
      firstName: _faker.default.name.firstName(),
      lastName: _faker.default.name.lastName(),
      country: _faker.default.address.country(),
      gender: 'male',
      street: 'ajayi estate',
      city: _faker.default.address.city(),
      state: _faker.default.address.state(),
      birthdate: _faker.default.date.past(),
      phoneNumber: _faker.default.phone.phoneNumber()
    };
    const response = await _chai.default.request(_index.default).put(`/api/users/profile/${id}/update`).send(user).set('authorization', `Bearer ${token}`);
    const {
      body: {
        status
      }
    } = response;
    (0, _chai.expect)(response).to.have.status(200);
    (0, _chai.expect)(status).to.equal('success');
  });
});