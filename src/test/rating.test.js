import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import faker from 'faker';
import server from '../index';
import { AuthController } from '../controllers';
import { FacilityService } from '../services';
import { newSupplier, newFacility } from './dummies';
import { describe } from '@hapi/joi';

chai.use(chaiHttp);

const { supplierSignup } = AuthController;
const { createFacility } = FacilityService;

describe('Ratings Test', () => {
  let supId;
  let facId;
  let adminToken;

  before(async () => {
    const supplierData = { ...newSupplier, email: faker.internet.email() };
    const supReq = {
      body: { ...supplierData }
    };

    const res = {
      cookie() { return this; },
      status() { return this; },
      json(obj) { return obj; }
    };

    const supplier = await supplierSignup(supReq, res);
    supId = supplier.data.id;
    adminToken = supplier.data.user.token;

    const facility = await createFacility({ ...newFacility, companyType: 'supplier', supId });
    facId = facility.id;
  });

  describe('POST Rating Test', async () => {
    it('should successfully create a rating', () => {
      const rating = {
        rating: 4,
        facilityId: facId,
      };
  
      const response = await chai
        .request(server)
        .post('/api/rating/facility')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(rating);
      expect(response).to.have.status(201);
      expect(response.body.data).to.include({
        rating: 4,
        facilityId: facId
      });
    });
  });

  describe('GET Rating Test', async () => {
    it('should successfully get the average rating for a facility', () => {
      const response = await chai
        .request(server)
        .get('/api/rating/facility/1')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(rating);
      expect(response).to.have.status(200);
      expect(response.body.data).to.have.property('facilityId');
      expect(response.body.data).to.have.property('averageRating');
    });
  });
});
