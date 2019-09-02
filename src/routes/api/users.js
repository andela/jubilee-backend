import { Router } from 'express';
import { UserController, RoleController } from '../../controllers';
import { AuthMiddleware, RoleMiddleware } from '../../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyCompanySuperAdmin } = RoleMiddleware;
const { userProfile, updateProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', verifyCompanySuperAdmin, updateUserRole);

export default router;
