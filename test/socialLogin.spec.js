import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/index';

chai.use(chaiHttp);

describe('Social signup and Login', () => {
  it('should login with facebook ', (done) => {
    chai
      .request(app)
      .post('/api/users/mockFacebook')
      .send({
        id: '1579056305559555',
        provider: 'facebook'
      })
      .end(() => {
        done();
      });
  });

  it('signup and login with google ', (done) => {
    chai
      .request(app)
      .post('/api/users/mockGoogle')
      .send({
        id: '116080001749246744313',
        provider: 'google'
      })
      .end(() => {
        done();
      });
  });
});
