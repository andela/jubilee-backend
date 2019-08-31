import { Router } from 'express';
import { UserController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import { roleController } from '../../controllers';
import { roleMiddleware } from '../../middlewares';

const router = Router();

const { updateUserRole } = roleController;
const { verifyCompanySuperAdmin } = roleMiddleware;

const router = Router();

const { userProfile, updateProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', verifyCompanySuperAdmin, updateUserRole);

export default router;
