import { Router } from 'express';
import { RequestController } from '../controllers';
import { TripRequestMiddleware, AuthMiddleware } from '../middlewares';

const router = Router();

const { allTripRequest } = RequestController;
const { onTripRequest, checkManagerId } = TripRequestMiddleware;
const { authenticate } = AuthMiddleware;

router.post('/request', authenticate, onTripRequest, checkManagerId, allTripRequest);

export default router;
