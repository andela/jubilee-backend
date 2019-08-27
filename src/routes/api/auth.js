import { Router } from 'express';
import { Auth } from '../../controllers';
import userMiddleware from '../../middlewares';

const router = Router();
const { signUp, verifyEmail } = Auth;

router.post('/signup', userMiddleware.onSignup, signUp);
router.get('/verify', verifyEmail);

export default router;
