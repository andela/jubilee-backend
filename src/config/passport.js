import dotenv from 'dotenv';
import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { OAuth2Strategy } from 'passport-google-oauth';

dotenv.config();

const {
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  FACEBOOK_CALLBACK,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK
} = process.env;

passport.use(new OAuth2Strategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK,
  profileFields: ['name', 'photos', 'email']
},
(accessToken, refreshToken, profile, done) => done(null, profile)));

passport.use(new FacebookStrategy({
  clientID: FACEBOOK_CLIENT_ID,
  clientSecret: FACEBOOK_CLIENT_SECRET,
  callbackURL: FACEBOOK_CALLBACK,
  profileFields: ['name', 'photos', 'emails']
},
(accessToken, refreshTocken, profile, done) => done(null, profile)));

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

export default passport;
