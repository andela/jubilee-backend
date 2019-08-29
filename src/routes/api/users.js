import { Router } from 'express';
import { User } from '../../controllers';

const router = Router();

const { userProfile, updateProfile } = User;

router.get('/profile/:userId', userProfile);
router.patch('/profile/:userId/update', updateProfile);

export default router;
