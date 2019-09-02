import { Router } from 'express';
import { UserController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';

const router = Router();

const { userProfile, updateProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

export default router;
