import { Router } from 'express';
import { UserController } from '../../controllers';

const router = Router();

const { loginUser } = UserController;

router.post('/auth/login', loginUser);

export default router;
