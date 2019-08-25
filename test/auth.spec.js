import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../src';
import { newUser } from './dummies';
import Helpers from '../src/utils/helpers';

const { generateToken } = Helpers;

chai.use(chaiHttp);

let newlyCreatedUser = {};
describe('Auth Route Endpoisignup', () => {
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

    const response = await chai
      .request(server)
      .post('/api/auth/signup')
      .send(user);
    expect(response.body.status).to.equal(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.token).to.be.a('string');
    expect(response.body.data.firstName).to.be.a('string');
    expect(response.body.data.lastName).to.be.a('string');
  });
  it("should send a verification link to a user's email upon successful registration", (done) => {
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(newUser)
      .end((err, res) => {
        const {
          body: { data }
        } = res;
        newlyCreatedUser = { ...data };
        expect(res).to.have.status(201);
        expect(data.isVerified).to.equal(false);
        expect(data.emailSent).to.equal(true);
        done(err);
      });
  });
  it('should return a response that indicates verification link was not sent whenever a mail is not sent upon successful registration', (done) => {
    const user2 = { ...newUser };
    user2.email = 'notvalid';
    chai
      .request(server)
      .post('/api/auth/signup')
      .send(user2)
      .end((err, res) => {
        const {
          body: {
            data: { isVerified, emailSent }
          }
        } = res;
        expect(res).to.have.status(201);
        expect(isVerified).to.equal(false);
        expect(emailSent).to.equal(false);
        done(err);
      });
  });
});
describe('GET /api/auth/verify?token', () => {
  it('should successfully verify an existing user if the token is valid', (done) => {
    const { id, firstName, role } = newlyCreatedUser;
    const token = generateToken({ id, firstName, role });
    chai
      .request(server)
      .get(`/api/auth/verify?token=${token}`)
      .end((err, res) => {
        const {
          body: {
            data: { isVerified }
          }
        } = res;
        expect(res).to.have.status(200);
        expect(isVerified).to.equal(true);
        done(err);
      });
  });
  it('should return an error response if verification token is not provided', (done) => {
    chai
      .request(server)
      .get('/api/auth/verify?token=')
      .end((err, res) => {
        const {
          body: { message }
        } = res;
        expect(res).to.have.status(400);
        expect(message).to.equal('Invalid token, verification unsuccessful');
        done(err);
      });
  });
  it('should return an error response if verification token is not valid', (done) => {
    chai
      .request(server)
      .get('/api/auth/verify?token=73783489d.eue4.78')
      .end((err, res) => {
        const {
          body: { message }
        } = res;
        expect(res).to.have.status(400);
        expect(message).to.equal('Invalid token, verification unsuccessful');
        done(err);
      });
  });
  it('should return an error response if verification token is not valid', (done) => {
    const token = generateToken({ id: 49 });
    chai
      .request(server)
      .get(`/api/auth/verify?token=${token}`)
      .end((err, res) => {
        const {
          body: { message }
        } = res;
        expect(res).to.have.status(400);
        expect(message).to.equal('no user found to verify');
        done(err);
      });
  });
});
