import { Router } from 'express';
import { MockController } from '../controllers';

const router = Router();
const { notify } = MockController;

router.post('/notification', notify);

export default router;
