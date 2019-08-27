import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import userRouter from './users';

const router = Router();

router.use('/', userRouter);

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
