import { Router } from 'express';
import { AuthMiddleware, CommentMiddleware } from '../middlewares';
import { CommentController } from '../controllers';

const { authenticate } = AuthMiddleware;
const { validateComment, verifyAuthor, verifyCommenter } = CommentMiddleware;
const { create, deleteComment } = CommentController;

const router = Router();

router.post('/', authenticate, verifyAuthor, validateComment, create);
router.delete('/:commentId', authenticate, verifyCommenter, deleteComment);

export default router;
