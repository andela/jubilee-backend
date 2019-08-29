import { Router } from 'express';
import passport from '../../config/passport';
import { authController } from '../../controllers';
import { rightEmail, wrongEmail } from '../../../test/features';
import {
  passwordMiddleware, authMiddleware,
} from '../../middlewares';

const router = Router();
const {
<<<<<<< HEAD
  signup, verifyEmail, sendResetPasswordEmail, resetPassword, verifyPasswordResetLink,
  loginUser, socialLogin, logout
=======
  userSignup, supplierSignup, verifyEmail, sendResetPasswordEmail, resetPassword, verifyPasswordResetLink,
  loginUser, socialLogin
>>>>>>> feature(supplier): add endpoint for supplier signup and modify failing test cases
} = authController;
const { checkParameters } = passwordMiddleware;

router.post('/signup/user', authMiddleware.onUserSignup, userSignup);
router.post('/signup/supplier', authMiddleware.onSupplierSignup, supplierSignup);
router.get('/verify', verifyEmail);
router.post('/login', loginUser);
router.post('/reset-password/', checkParameters, sendResetPasswordEmail);
router.get('/reset-password', verifyPasswordResetLink);
router.post('/password/reset/:email', checkParameters, resetPassword);
router.get('/logout', logout);

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
