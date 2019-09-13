import { Router } from 'express';
import { AuthMiddleware, CommentMiddleware } from '../middlewares';
import { CommentController } from '../controllers';

const { authenticate } = AuthMiddleware;
const { validateComment, verifyAuthor } = CommentMiddleware;
const { create } = CommentController;

const router = Router();

router.post('/', authenticate, verifyAuthor, validateComment, create);

export default router;
