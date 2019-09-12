import { Router } from 'express';
import { FacilityController } from '../controllers';
import { AuthMiddleware, FacilityMiddleware, RoleMiddleware } from '../middlewares';
import { Permissions } from '../utils';

const router = Router();
const {
  addFacilitySupplier, createCompanyFacility, roomUpdate, amenitiesUpdate
} = FacilityController;
const { authenticate } = AuthMiddleware;
const { onCreateFacility, verifyFacility } = FacilityMiddleware;
const { verifyRoles } = RoleMiddleware;
const { supplierAdmin, companyTravelAdmins } = Permissions;

router.post('/supplier', authenticate, verifyRoles(supplierAdmin), onCreateFacility(), addFacilitySupplier);
router.post('/company', authenticate, verifyRoles(companyTravelAdmins), onCreateFacility(true), createCompanyFacility);
router.patch('/supplier/:facilityId/:roomId', authenticate, verifyRoles(supplierAdmin), verifyFacility, roomUpdate);
router.patch('/supplier/:facilityId/', authenticate, verifyRoles(supplierAdmin), verifyFacility, amenitiesUpdate);

export default router;
