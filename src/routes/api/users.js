import { Router } from 'express';
import { User } from '../../controllers';
import { Authentication } from '../../middlewares';

const router = Router();

const { userProfile, updateProfile } = User;
const { isAuthenticated } = Authentication;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.patch('/profile/:userId/update', isAuthenticated, updateProfile);

export default router;
