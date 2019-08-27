import { Router } from 'express';
import { Auth } from '../../controllers';

const router = Router();
const { signUp, verifyEmail } = Auth;

router.post('/signup', signUp);
router.get('/verify', verifyEmail);

export default router;
