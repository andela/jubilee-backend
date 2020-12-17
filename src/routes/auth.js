import { Router } from 'express';
import passport from '../config/passport';
import { AuthController } from '../controllers';
import { rightEmail, wrongEmail } from '../test/features';
import {
  PasswordMiddleware, AuthMiddleware,
} from '../middlewares';


const router = Router();
const {
  userSignup, supplierSignup, verifyEmail, sendResetPasswordEmail, resetPassword,
  verifyPasswordResetLink, loginUser, socialLogin, logout, companySignUp
} = AuthController;


const {
  onCompanySignup, onSupplierSignup, onUserSignup, onUserLogin
} = AuthMiddleware;
const { checkParameters } = PasswordMiddleware;

router.post('/signup/user', onUserSignup, userSignup);
router.post('/signup/supplier', onSupplierSignup, supplierSignup);
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
