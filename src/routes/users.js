import { Router } from 'express';
import { PermissionId } from '../utils';
import { UserController, RoleController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyCompanyRoles } = RoleMiddleware;
const { userProfile, updateProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;
const { one } = PermissionId;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', one, verifyCompanyRoles, updateUserRole);

export default router;
