import express from 'express';
import {
  setUser,
  verifyToken,
} from '../middlewares/verifyAuth';
import {
  createComment,
  deleteComment,
} from '../controllers/commentsController';

const router = express.Router();

router.post('/comments/', verifyToken, setUser, createComment);
router.delete('/comments/:id', verifyToken, setUser, deleteComment);

export default router;
