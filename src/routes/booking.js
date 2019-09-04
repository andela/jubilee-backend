import { Router } from 'express';
import { BookingController } from '../controllers';
import { BookingMiddleware } from '../middlewares';

const router = Router();
const { createAccBooking } = BookingController;
const { validateFields } = BookingMiddleware;

router.post('/accommodation', validateFields, createAccBooking);

export default router;
