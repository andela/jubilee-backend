import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';
import { newUser, tripRequest } from './dummies';
import Helpers from '../utils/helpers';

const { generateToken } = Helpers;
const { id, email } = newUser;
const token = generateToken({ id, email });

chai.use(chaiHttp);

describe('Trip Request Endpoint', () => {
  it('should successfully create a one-way trip request', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send(tripRequest);

    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data).to.be.a('string');
  });

  it('should return validation error requesterId is invalid', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, requesterId: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('User does not exist');
  });

  it('should return validation error ManagerId is empty', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, ManagerId: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid ManagerId \n the field must not be empty');
  });

  it('should return validation error purpose is empty', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, purpose: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid purpose \n the field must not be empty and it must be more than 2 letters');
  });
  it('should return validation error source is empty', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, source: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid source \n the field must not be empty and it must be more than 2 letters');
  });
  it('should return validation error destination is empty', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, destination: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid destination \n the field must not be empty and it must be more than 2 letters');
  });
  it('should return validation error ManagerId is empty', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, accBookingId: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please enter a valid accBookingId \n the field must not be empty');
  });
  it('should return validation error ManagerId is empty', async () => {
    const response = await chai
      .request(server)
      .set('Cookie', `token=${token};`)
      .post('/api/trip/request')
      .send({ ...tripRequest, departureDate: '' });
    expect(response).to.have.status(400);
    expect(response.body.status).to.equal('fail');
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.equal('Please input a valid date format: yy-mm-dd');
  });
});
