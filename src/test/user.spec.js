import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../index';

chai.use(chaiHttp);
describe('User Route Endpoints', () => {
  describe('GET REQUESTS', () => {
    it('should successfully populate the user data on the profile with a status of 200', async () => {
      const id = 1;
      const response = await chai.request(server).get(`/api/users/profile/${id}`);
      const { body: { data } } = response;
      expect(response).to.have.status(200);
      expect(data).to.equal('works');
    });
  });
  describe('PATCH REQUESTS', () => {
    it('should update the user data successfully with a status of 200', async () => {
      const id = 1;
      const response = await chai.request(server).patch(`/api/users/profile/${id}/update`);
      const { body: { data } } = response;
      expect(response).to.have.status(200);
      expect(data).to.equal('works');
    });
  });
});
