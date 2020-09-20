import express from 'express';
import { createComment } from '../controllers/commentsController';
import { verifyToken } from '../middlewares/verifyAuth';

const router = express.Router();

router.post('/comments/', verifyToken, createComment);

export default router;
