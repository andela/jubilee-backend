import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../swagger.json';
import userRoutes from './users';
import authRoutes from './auth';
import facilityRoutes from './facility';
import bookingRoutes from './booking';
import tripRoutes from './trip';
import commentRoutes from './comment';
import mockRoutes from './mock';

const router = Router();

router.use('/auth', authRoutes);
router.use('/booking', bookingRoutes);
router.use('/users', userRoutes);
router.use('/facility', facilityRoutes);
router.use('/trip', tripRoutes);
router.use('/comment', commentRoutes);
router.use('/mock', mockRoutes);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
