import { Router } from 'express';
import { Permissions } from '../utils';
import { UserController, RoleController, RequestController } from '../controllers';
import { AuthMiddleware, RoleMiddleware, TripRequestMiddleware } from '../middlewares';

const router = Router();

const { updateUserRole } = RoleController;
const { verifyRoles } = RoleMiddleware;
const { getUserRequests, getTripRequestsStats } = RequestController;
const { userProfile, updateProfile } = UserController;
const { isAuthenticated, authenticate } = AuthMiddleware;
const { supplierAdmin } = Permissions;
const { tripStatsCheck } = TripRequestMiddleware;

router.get('/requests', authenticate, getUserRequests);
router.post('/request/stats', authenticate, tripStatsCheck, getTripRequestsStats);
router.get('/profile/:userId', isAuthenticated, userProfile);
router.put('/profile/:userId', isAuthenticated, updateProfile);

router.patch('/role', authenticate, verifyRoles(supplierAdmin), updateUserRole);

export default router;
