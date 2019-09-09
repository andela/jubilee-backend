import { Router } from 'express';
import { BookingController } from '../controllers';
import { BookingMiddleware, AuthMiddleware } from '../middlewares';

const router = Router();
const { createAccBooking } = BookingController;
const { validateFields } = BookingMiddleware;
const { authenticate } = AuthMiddleware;

router.post('/accommodation', authenticate, validateFields, createAccBooking);

export default router;
