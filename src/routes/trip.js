import { Router } from 'express';
import { RequestController } from '../controllers';
import { TripRequestMiddleware, AuthMiddleware } from '../middlewares';

const router = Router();

const { oneWayTripRequest } = RequestController;
const { onTripRequest, tripCheckUser, checkUserRecordExist } = TripRequestMiddleware;
const { authenticate } = AuthMiddleware;

router.post('/request', authenticate, onTripRequest, tripCheckUser, checkUserRecordExist, oneWayTripRequest);

export default router;
