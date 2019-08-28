import { Router } from 'express';
import passport from '../../config/passport';
import { Auth } from '../../controllers';
import { rightEmail, wrongEmail } from '../../../test/features';
import {
  ResetPassword, userMiddleware,
} from '../../middlewares';

const router = Router();
const {
  signUp, verifyEmail, sendResetPasswordEmail, resetPassword, verifyPasswordResetLink,
  loginUser, socialLogin
} = Auth;
const { checkParameters } = ResetPassword;

router.post('/signup', userMiddleware.onSignup, signUp);
router.get('/verify', verifyEmail);
router.post('/login', loginUser);
router.post('/reset-password/', checkParameters, sendResetPasswordEmail);
router.get('/reset-password', verifyPasswordResetLink);
router.post('/password/reset/:email', checkParameters, resetPassword);

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get('/facebook/callback',
  passport.authenticate('facebook'),
  socialLogin);

router.get('/google', passport.authenticate('google', { scope: ['email'] }));
router.get('/google/callback',
  passport.authenticate('google'),
  socialLogin);

router.get('/rightSocial', rightEmail, socialLogin);
router.get('/wrongSocial', wrongEmail, socialLogin);

export default router;
