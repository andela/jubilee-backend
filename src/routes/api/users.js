import express from 'express';
import { UserController } from '../../controllers/index';

const router = express.Router();

router.post('/auth/signup', UserController.createUser);
