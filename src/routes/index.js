import { Router } from 'express';

const router = Router();

router.use('/api', require('./api'));

export default router;
