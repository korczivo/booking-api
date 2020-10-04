import express from 'express';

import { login } from '../controllers/authController';
import { loginValid } from '../helpers/validators/authValidator';

const router = express.Router();

router.post('/auth/login', loginValid, login);

export default router;
