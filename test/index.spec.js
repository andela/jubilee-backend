import chai from 'chai';
import chaiHttp from 'chai-http';

const { expect }  = chai;
chai.use(chaiHttp);

describe('Initial test', () => {
  it('should be equal to barefoot', () => {
    expect('barefoot').to.equal('barefoot');
  });
});
