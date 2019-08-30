import { Router } from 'express';
import { UserController } from '../../controllers';
import { AuthMiddleware } from '../../middlewares';
import { Role } from '../../controllers';
import { roleMiddleware } from '../../middlewares';

const { updateUserRole } = Role;
const { verifyCompanySuperAdmin } = roleMiddleware;

const router = Router();

const { userProfile, updateProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', verifyCompanySuperAdmin, updateUserRole);

export default router;
