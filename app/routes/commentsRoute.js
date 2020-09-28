import express from 'express';
import {
  setUser,
  verifyToken,
} from '../middlewares/verifyAuth';
import {
  createComment,
  deleteComment,
  updateComment,
} from '../controllers/commentsController';
import { isCommentExists } from '../helpers/comments';

const router = express.Router();

router.post('/comments/', verifyToken, setUser, createComment);
router.delete('/comments/:id', verifyToken, setUser, isCommentExists, deleteComment);
router.patch('/comments/:id', verifyToken, setUser, isCommentExists, updateComment);

export default router;
