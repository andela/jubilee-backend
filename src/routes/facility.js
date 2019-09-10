import { Router } from 'express';
import { FacilityController } from '../controllers';
import { AuthMiddleware, FacilityMiddleware, RoleMiddleware } from '../middlewares';
import { Permissions } from '../utils';

const router = Router();
const { addFacilitySupplier, createCompanyFacility } = FacilityController;
const { authenticate } = AuthMiddleware;
const { onCreateFacility } = FacilityMiddleware;
const { verifyRoles } = RoleMiddleware;
const { supplierAdmin, companyTravelAdmins } = Permissions;

router.post('/supplier', authenticate, verifyRoles(supplierAdmin), onCreateFacility(), addFacilitySupplier);
router.post('/company', authenticate, verifyRoles(companyTravelAdmins), onCreateFacility(true), createCompanyFacility);

export default router;
