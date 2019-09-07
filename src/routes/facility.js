import { Router } from 'express';
import { FacilityController } from '../controllers';
import { AuthMiddleware, FacilityMiddleware } from '../middlewares';

const router = Router();
const { addFacilitySupplier } = FacilityController;
const { authenticate, isSupplierAdmin } = AuthMiddleware;
const { onCreateFacility } = FacilityMiddleware;

router.post('/supplier', authenticate, isSupplierAdmin, onCreateFacility, addFacilitySupplier);

export default router;
