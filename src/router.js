import express from 'express';
import jwtVerifier from './middleware/auth/auth.middleware.js';
import controller from './controller.js';
import {
  signupValidator,
  authenticateValidator,
  updateValidator,
} from './middleware/validator/validator.middleware.js';

const router = express.Router();

router.post('/', signupValidator, async (req, res, next) => {
  await controller.create(req, res, next);
});

router.post('/signin', authenticateValidator, async (req, res, next) => {
  await controller.authenticate(req, res, next);
});

// JWT auth for the endpoints below
router.use(jwtVerifier);

router.get('/', async (req, res, next) => {
  await controller.read(req, res, next);
});

router.patch('/', updateValidator, async (req, res, next) => {
  await controller.update(req, res, next);
});

router.delete('/', async (req, res, next) => {
  await controller.delete(req, res, next);
});

export default router;
