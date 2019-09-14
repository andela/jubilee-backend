import { Router } from 'express';
import { Permissions } from '../utils';
import { UserController, RoleController, RequestController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyRoles } = RoleMiddleware;
const { getUserRequests } = RequestController;
const { userProfile, updateProfile } = UserController;
const { isAuthenticated, authenticate } = AuthMiddleware;
const { supplierAdmin } = Permissions;

router.get('/requests', authenticate, getUserRequests);
router.get('/:userId', isAuthenticated, userProfile);
router.put('/:userId', isAuthenticated, updateProfile);

router.patch('/role', authenticate, verifyRoles(supplierAdmin), updateUserRole);

export default router;
