import { Router } from 'express';
import { User } from '../../controllers';
import { UserMiddleware } from '../../middlewares';

const router = Router();

const { userProfile, updateProfile } = User;
const { isAuthenticated } = UserMiddleware;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.get('/profile/:userId/edit', isAuthenticated, userProfile);
router.put('/profile/:userId/update', isAuthenticated, updateProfile);

export default router;
