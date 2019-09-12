import { Router } from 'express';
import { Permissions } from '../utils';
import { UserController, RoleController, RequestController } from '../controllers';
import { AuthMiddleware, RoleMiddleware } from '../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyRoles } = RoleMiddleware;
const { getUserRequests } = RequestController;
const { getProfile, updateProfile, toggleEmailNotification } = UserController;
const { isAuthenticated, authenticate } = AuthMiddleware;
const { supplierAdmin } = Permissions;

router.get('/requests', authenticate, getUserRequests);
router.get('/profile/:userId', isAuthenticated, getProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);
router.patch('/:userId/notification', isAuthenticated, toggleEmailNotification);

router.patch('/role', authenticate, verifyRoles(supplierAdmin), updateUserRole);

export default router;
