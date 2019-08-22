import { Router } from 'express';

const router = Router();

const { loginUser } = UserController;

router.post('/auth/login', loginUser);

export default router;
