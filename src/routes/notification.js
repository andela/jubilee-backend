import { Router } from 'express';
import { NotificationController } from '../controllers';
import { AuthMiddleware } from '../middlewares';

const router = Router();
const { markAllAsRead } = NotificationController;
const { authenticate } = AuthMiddleware;

router.patch('/status/seen', authenticate, markAllAsRead);

export default router;
