import express from 'express';
import jwtVerifier from './middleware/auth/auth.middleware.js';
import controller from './controller.js';
import {
  signupValidator,
  authenticateValidator,
  updateValidator,
} from './middleware/validator/validator.middleware.js';

const router = express.Router();

router.get('/healthcheck', async (req, res) => {
  await controller.healthCheck(req, res);
});

router.post('/', signupValidator, async (req, res) => {
  await controller.create(req, res);
});

router.post('/signin', authenticateValidator, async (req, res) => {
  await controller.authenticate(req, res);
});

// JWT auth for the endpoints below
router.use(jwtVerifier);

router.get('/', async (req, res) => {
  await controller.read(req, res);
});

router.patch('/', updateValidator, async (req, res) => {
  await controller.update(req, res);
});

router.delete('/', async (req, res) => {
  await controller.delete(req, res);
});

export default router;
