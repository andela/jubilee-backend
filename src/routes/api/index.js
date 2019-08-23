import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../../../swagger.json';
import userRouter from './users';

const router = Router();

// Auth routes
router.use('/', userRouter);

router.use((err, req, res, next) => {
  if (err.name === 'ValidationError') {
    return res.status(422).json({
      errors: Object.keys(err.errors).reduce((errors, key) => {
        errors[key] = err.errors[key].message;
        return errors;
      }, {})
    });
  }

  return next(err);
});

router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));

module.exports = router;
