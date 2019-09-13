import { Router } from 'express';
import { Permissions } from '../utils';
import { UserController, RoleController, RequestController } from '../controllers';
import { AuthMiddleware, RoleMiddleware, UserMiddleware } from '../middlewares';

const { verifyRoles } = RoleMiddleware;
const { supplierAdmin, companyAdminManager } = Permissions;

const router = Router();

const { updateUserRole } = RoleController;
const {
  userProfile, updateProfile
} = UserController;
const {
  getRequest, updateRequest, getUserRequests,
  getRequestByIdUserId, updateUserRequest
} = RequestController;
const { isAuthenticated, authenticate } = AuthMiddleware;
const { onUpdateProfile, onRequestStatus, isUsersOwnIsStatus } = UserMiddleware;

router.get('/profile/:userId', authenticate, isAuthenticated, userProfile);
router.put('/profile/:userId', authenticate, isAuthenticated, onUpdateProfile, updateProfile);

router.get('/requests', authenticate, getUserRequests);
router.get('/requests/:statusId', authenticate, verifyRoles(companyAdminManager), onRequestStatus, getRequest);// get request by userId in the token and specifying status in param
router.patch('/requests/:requestId', authenticate, verifyRoles(companyAdminManager), onRequestStatus, updateRequest); // update requests by specifying request id in params
router.get('/requests/:requestId/edit', authenticate, isUsersOwnIsStatus, onRequestStatus, getRequestByIdUserId);// get a single request by userId and requestId
router.put('/requests/:requestId/update', authenticate, isUsersOwnIsStatus, onRequestStatus, updateUserRequest);

router.patch('/role', authenticate, verifyRoles(supplierAdmin), updateUserRole);

export default router;
