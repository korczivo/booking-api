import express from 'express';

import { checkSchema } from 'express-validator';

import { createUser } from '../controllers/usersController';
import {createUserValidSchema, userValid} from '../helpers/validators/userValidator';

const router = express.Router();

router.post('/auth/signup', userValid, createUser);

export default router;
