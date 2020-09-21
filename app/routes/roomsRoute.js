import express from 'express';

import {
  createRoom,
  deleteRoom,
  getRoom,
  getRooms,
} from '../controllers/roomsController';

const router = express.Router();

router.get('/rooms/:id', getRoom);
router.delete('/rooms/:id', deleteRoom);
router.get('/rooms/', getRooms);
router.post('/rooms/', createRoom);

export default router;
