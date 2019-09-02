import { Router } from 'express';
import passport from '../../config/passport';
import { authController } from '../../controllers';
import {
  passwordMiddleware, authMiddleware,
} from '../../middlewares';
import { rightEmail, wrongEmail } from '../../../test/features';

const router = Router();
const {
  userSignup, supplierSignup, verifyEmail, sendResetPasswordEmail, resetPassword,
  verifyPasswordResetLink, loginUser, logout, companySignUp, socialLogin,
} = authController;

const { onCompanySignup, onUserLogin } = authMiddleware;
const { checkParameters } = passwordMiddleware;

router.post('/signup/user', authMiddleware.onUserSignup, userSignup);
router.post('/signup/supplier', authMiddleware.onSupplierSignup, supplierSignup);
router.post('/signup/company', onCompanySignup, companySignUp);
router.get('/verify', verifyEmail);
router.post('/login', onUserLogin, loginUser);
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
