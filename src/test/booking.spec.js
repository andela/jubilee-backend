import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../index';

chai.use(chaiHttp);

describe('Booking Route Endpoints', () => {
  it('should successfully create an accommodation booking', async () => {
    const booking = {
      fullname: 'Mr. John Doe',
      checkIn: '2030-12-20',
      checkOut: '2030-12-30'
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data.fullname).to.be.a('string');
  });

  it('should fail validation if fullname is not provided', async () => {
    const booking = {
      checkIn: '2030-12-20',
      checkOut: '2030-12-30'
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });

  it('should fail validation if fullname is empty', async () => {
    const booking = {
      fullname: '',
      checkIn: '2030-12-20',
      checkOut: '2030-12-30'
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });

  it('should fail validation if checkIn is not provided', async () => {
    const booking = {
      fullname: 'Miss Jane Smith',
      checkOut: '2030-12-30'
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });

  it('should fail validation if checkIn is empty', async () => {
    const booking = {
      fullname: 'Miss Jane Smith',
      checkIn: '',
      checkOut: '2030-12-30'
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });

  it('should fail validation if checkOut is not provided', async () => {
    const booking = {
      fullname: 'Miss Jane Doe',
      checkIn: '2030-12-20'
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });

  it('should fail validation if checkOut is empty', async () => {
    const booking = {
      fullname: 'Miss Jane Doe',
      checkIn: '2030-12-20',
      checkOut: ''
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.a('string');
  });
});
