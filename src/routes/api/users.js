import { Router } from 'express';
import UserController from '../../controllers';

const userRouter = Router();

const { createUser, loginUser } = UserController;

userRouter.post('/auth/signup', createUser);

userRouter.post('/auth/login', loginUser);

export default userRouter;

