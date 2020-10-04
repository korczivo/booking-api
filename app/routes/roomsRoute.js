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
  updateRoom,
} from '../controllers/roomsController';

import { createRoomValid } from '../helpers/validators/roomsValidator';

const router = express.Router();

router.get('/rooms/', getRooms);

router.get('/rooms/:id', getRoom);

router.post('/rooms/',
  createRoomValid,
  verifyToken,
  setUser,
  createRoom);

router.patch('/rooms/:id',
  verifyToken,
  setUser,
  updateRoom);

router.delete('/rooms/:id',
  verifyToken,
  setUser,
  deleteRoom);

export default router;
