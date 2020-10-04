import express from 'express';

import { createUser } from '../controllers/usersController';

import { userValidSchema } from '../helpers/validators/userValidator';

const router = express.Router();

router.post('/auth/signup', userValidSchema, createUser);

export default router;
