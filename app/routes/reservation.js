import express from 'express';

import { createReservation } from '../controllers/reservationController';

import {
  setUser,
  verifyToken,
} from '../middlewares/verifyAuth';

import { createReservationValid } from '../helpers/validators/reservationValidator';

const router = express.Router();

router.post('/reservation/',
  createReservationValid,
  verifyToken,
  setUser,
  createReservation);

router.get('/reservation/:id',
  createReservationValid,
  verifyToken,
  setUser,
  createReservation);

export default router;
