import express from 'express';

import { createRoom } from '../controllers/roomsController';

const router = express.Router();

router.post('/rooms/', createRoom);

export default router;
