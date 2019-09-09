import { Router } from 'express';
import { Permissions } from '../utils';
import { UserController, RoleController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyRoles } = RoleMiddleware;
const { userProfile, updateProfile } = UserController;
const { isAuthenticated, authenticate } = AuthMiddleware;
const { supplierAdmin } = Permissions;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', authenticate, verifyRoles(supplierAdmin), updateUserRole);

export default router;
