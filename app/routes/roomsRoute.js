import express from 'express';

import {
  setUser,
  verifyToken,
} from '../middlewares/verifyAuth';
import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from '../controllers/roomsController';

const router = express.Router();

router.get('/rooms/:id', getRoom);
router.delete('/rooms/:id', verifyToken, setUser, deleteRoom);
router.get('/rooms/', getRooms);
router.post('/rooms/', verifyToken, setUser, createRoom);

export default router;
