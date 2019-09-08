import { Router } from 'express';
import { PermissionId } from '../utils';
import { UserController, RoleController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyCompanyRoles, verifyRoles } = RoleMiddleware;
const { userProfile, updateProfile } = UserController;
const { isAuthenticated } = AuthMiddleware;
const { superAdmins } = PermissionId;

router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', verifyRoles(superAdmins), updateUserRole);

export default router;
