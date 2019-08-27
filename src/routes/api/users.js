import { Router } from 'express';
import authController from '../../controllers';

const userRouter = Router();

const { createUser, loginUser } = authController;

userRouter.post('/auth/signup', createUser);

userRouter.post('/auth/login', loginUser);

export default userRouter;

