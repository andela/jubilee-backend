import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../index';

chai.use(chaiHttp);

describe('Booking Route Endpoints', () => {
  it('should successfully create an accommodation booking', async () => {
    const booking = {
      fullname: faker.name.firstName(),
      checkIn: new Date(),
      checkOut: new Date()
    };

    const response = await chai
      .request(server)
      .post('/api/booking/accommodation')
      .send(booking);

    expect(response).to.have.status(201);
    expect(response.body.data).to.be.a('object');
    expect(response.body.data).to.be.a('string');
  });
});
