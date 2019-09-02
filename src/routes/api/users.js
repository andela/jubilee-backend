import { Router } from 'express';
import { userController, roleController } from '../../controllers';
import { authMiddleware, roleMiddleware } from '../../middlewares';

const router = Router();

const { updateUserRole } = roleController;
const { verifyCompanySuperAdmin } = roleMiddleware;
const { userProfile, updateProfile } = userController;
const { isAuthenticated } = authMiddleware;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', verifyCompanySuperAdmin, updateUserRole);

export default router;
