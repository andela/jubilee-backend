import { Router } from 'express';
import { FacilityController } from '../controllers';
import { AuthMiddleware, FacilityMiddleware, RoleMiddleware } from '../middlewares';
import { Permissions } from '../utils';

const router = Router();
const { addFacilitySupplier } = FacilityController;
const { authenticate } = AuthMiddleware;
const { onCreateFacility } = FacilityMiddleware;
const { verifyRoles } = RoleMiddleware;
const { supplierAdmin } = Permissions;

router.post('/supplier', authenticate, verifyRoles(supplierAdmin), onCreateFacility, addFacilitySupplier);

export default router;
