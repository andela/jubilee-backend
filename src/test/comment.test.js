import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import server from '..';
import db from '../models';
import { Helpers } from '../utils';
import { AuthController, CommentController } from '../controllers';
import { CommentService } from '../services';
import {
  commentData, newCompanyUser, newRequest, newCompany, mockResponse
} from './dummies';

const { generateToken } = Helpers;
const { companySignUp, userSignup } = AuthController;

const { Request } = db;
chai.use(chaiHttp);
chai.use(sinonChai);

describe('Comment route endpoints', () => {
  let user, wrongUserToken, commentObj;
  before(async () => {
    const companyReq = { body: { ...newCompany, email: 'daylay1t@hotmail.com' } };
    const { data: { signupToken, admin } } = await companySignUp(companyReq, mockResponse);
    const userReq = {
      body: {
        ...newCompanyUser, email: 'kinga@google.com', signupToken, roleId: 5
      }
    };
    const { data } = await userSignup(userReq, mockResponse);
    user = data;
    const requestData = { ...newRequest, requesterId: user.id, managerId: admin.id };
    const { dataValues: { id } } = await Request.create(requestData);
    commentObj = { ...commentData, requestId: id };
    wrongUserToken = generateToken({ id: 100 });
  });
  afterEach(() => {
    sinon.restore();
  });
  it('should successfully create a comment', async () => {
    const response = await chai
      .request(server)
      .post('/api/comment')
      .send(commentObj).set('Cookie', `token=${user.token}`);
    expect(response).to.have.status(201);
    expect(response.body.data).to.include.all.keys('id', 'createdAt', 'author');
    expect(response.body.data).to.include({ message: commentObj.message });
  });
  it('should prevent a comment from being created with invalid entries', async () => {
    const response = await chai
      .request(server)
      .post('/api/comment')
      .send({ ...commentObj, message: '' }).set('Cookie', `token=${user.token}`);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to
      .eql('Please enter a valid comment and ensure it is not more than 1500 characters long');
  });
  it('should prevent a comment from being created if the message field is missing', async () => {
    delete commentObj.message;
    const response = await chai
      .request(server)
      .post('/api/comment')
      .send(commentObj).set('Cookie', `token=${user.token}`);
    expect(response).to.have.status(400);
    expect(response.body.error).to.be.a('object');
    expect(response.body.error.message).to.be.eql('Please enter a valid comment and ensure it is not more than 1500 characters long');
  });
  it('should prevent an unautheticated user from creating a comment', async () => {
    const response = await chai
      .request(server)
      .post('/api/comment')
      .send(commentObj);
    expect(response).to.have.status(401);
    expect(response.body.error.message).to.be.eql('Access denied, Token required');
  });
  it('should prevent an unauthorized user from creating a comment', async () => {
    const response = await chai
      .request(server)
      .post('/api/comment')
      .send(commentObj).set('Cookie', `token=${wrongUserToken}`);
    expect(response).to.have.status(403);
    expect(response.body.error.message).to.eql('You are an unauthorized author');
  });
  it('should return a 500 error response if something goes wrong while creating the comment', async () => {
    const req = { data: { id: 1 } };
    const mock = () => {
      const res = {};
      res.status = sinon.stub().returns(res);
      res.json = sinon.stub().returns(res);
      return res;
    };
    const res = mock();
    const errorResponse = {
      status: 'fail',
      error: {
        message: 'Some error occurred while processing your Request',
        errors: undefined
      }
    };
    sinon.stub(CommentService, 'createComment').throws();
    await CommentController.create(req, res);
    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith(errorResponse);
  });
});
