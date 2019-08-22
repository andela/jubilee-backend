import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import userRoutes from './users';
import authRoutes from './auth';

const router = Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

export default router;
