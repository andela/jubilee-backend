import { Router } from 'express';
import { Auth } from '../../controllers';
import { ResetPassword, userMiddleware } from '../../middlewares';

const router = Router();
const {
  signUp, verifyEmail, sendResetPasswordEmail, resetPassword, verifyPasswordResetLink, loginUser,
} = Auth;
const { checkParameters } = ResetPassword;

router.post('/signup', userMiddleware.onSignup, signUp);
router.get('/verify', verifyEmail);
router.post('/login', loginUser);
router.post('/reset-password/', checkParameters, sendResetPasswordEmail);
router.get('/reset-password', verifyPasswordResetLink);
router.post('/password/reset/:email', checkParameters, resetPassword);

export default router;
