import { Router } from 'express';
import { Auth } from '../../controllers';
import userMiddleware from '../../middlewares';

const router = Router();
const {
  signUp, verifyEmail, sendResetPasswordEmail, resetPassword, verifyPasswordResetLink
} = Auth;
const { checkParameters } = ResetPassword;

router.post('/signup', userMiddleware.onSignup, signUp);
router.get('/verify', verifyEmail);

export default router;
