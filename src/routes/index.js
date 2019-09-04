import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import userRoutes from './users';
import authRoutes from './auth';
import facilityRoutes from './facility';

const router = Router();

router.use('/auth', authRoutes);
router.use('/booking', bookingRoutes);
router.use('/users', userRoutes);
router.use('/facility', facilityRoutes);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
