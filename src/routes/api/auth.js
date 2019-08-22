import { Router } from 'express';
import { Auth } from '../../controllers';

const router = Router();
const { register, verifyEmail } = Auth;

router.post('/register', register);
router.get('/verify/:token', verifyEmail);

export default router;
