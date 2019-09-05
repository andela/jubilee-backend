import { Router } from 'express';
import { RequestController } from '../controllers';
import { TripRequestMiddleware, AuthMiddleware } from '../middlewares';

const router = Router();

const { oneWayTripRequest } = RequestController;
const { onTripRequest } = TripRequestMiddleware;
const { isAuthenticated } = AuthMiddleware;

router.post('/request', isAuthenticated, onTripRequest, oneWayTripRequest);

export default router;
