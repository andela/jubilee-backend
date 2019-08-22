import express from 'express';
import { UserController } from '../../controllers/index';

const userRouter = express.Router();

userRouter.post('/auth/signup', UserController.createUser);

export default userRouter;
