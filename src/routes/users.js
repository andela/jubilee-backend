import { Router } from 'express';
import { Permissions } from '../utils';
import { UserController, RoleController, RequestController } from '../controllers';
import { AuthMiddleware, RoleMiddleware, UserMiddleware } from '../middlewares';

const { verifyRoles } = RoleMiddleware;
const { supplierAdmin, companyAdmins, companyAdminManager } = Permissions;

const router = Router();

const { updateUserRole } = RoleController;
const { getUserRequests } = RequestController;
const {
  userProfile, updateProfile
} = UserController;
const {
  getAllRequest, getRequest, updateRequest
} = RequestController;
const { isAuthenticated, authenticate } = AuthMiddleware;
const { onUpdateProfile, onRequestStatus } = UserMiddleware;

router.get('/profile/:userId', authenticate, isAuthenticated, userProfile);
router.put('/profile/:userId', authenticate, isAuthenticated, onUpdateProfile, updateProfile);

router.get('/requests', authenticate, getUserRequests);
router.post('/requests', authenticate, createRequest);
router.get('/requests', authenticate, verifyRoles(companyAdmins), getAllRequest);// get all requests on table, only by admin and superadmin
router.get('/requests/user/:status', authenticate, onRequestStatus, getRequest);// get request by userId in the token and specifying status in param
router.patch('/requests/:requestId', authenticate, verifyRoles(companyAdminManager), onRequestStatus, updateRequest); // update requests by specifying request id in params

router.patch('/role', authenticate, verifyRoles(supplierAdmin), updateUserRole);

export default router;
